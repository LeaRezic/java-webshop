package src.com.webshop.Servlet;

import com.google.gson.JsonObject;
import src.com.webshop.Model.Auth.*;
import src.com.webshop.Model.Auth.AuthToken.AuthTokenClient;
import src.com.webshop.Model.Auth.AuthToken.AuthTokenManager;
import src.com.webshop.Model.Auth.LoginLog.LoginLogManager;
import src.com.webshop.Util.JsonUtil;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.stream.Collectors;

@WebServlet(name = "LoginServlet")
public class LoginServlet extends BaseServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        super.setAccessControlHeaders(response);
        String body = request.getReader().lines().collect(Collectors.joining());
        AuthRequestData authRequestData = (AuthRequestData) JsonUtil.getObjFromJson(body, AuthRequestData.class);
        Credentials credentials = authRequestData.getCredentials();
        if (credentials == null) {
            super.sendErrorResponse(
                    response,
                    HttpServletResponse.SC_BAD_REQUEST,
                    "Invalid request. Must supply login credentials."
            );
            return;
        }
        if (!AuthTokenManager.validateCredentials(credentials.getUsername(), credentials.getPassword())) {
            super.sendErrorResponse(
                    response,
                    HttpServletResponse.SC_BAD_REQUEST,
                    "Invalid Credentials. User does not exist or password is incorrect."
            );
            return;
        }
        AuthTokenClient tokenClient = AuthTokenManager.getNewClientToken(credentials.getUsername(), credentials.getPassword());
        if (tokenClient == null) {
            super.sendErrorResponse(
                    response,
                    HttpServletResponse.SC_BAD_REQUEST,
                    "Failed to construct auth token for client."
            );
            return;
        }
        LoginLogManager.logNewLogin(authRequestData);
        JsonObject responseData = JsonUtil.getJson(tokenClient, "token");
        super.printJsonResponse(response, responseData);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        super.setAccessControlHeaders(response);
    }

}
