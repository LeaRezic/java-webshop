package src.com.webshop.Servlet;

import com.google.gson.JsonObject;
import src.com.webshop.Model.Auth.*;
import src.com.webshop.Model.Auth.AuthToken.AuthTokenClient;
import src.com.webshop.Model.Auth.AuthManager;
import src.com.webshop.Model.LoginLog.LoginLogManager;
import src.com.webshop.Model.UserData.UserDataManager;
import src.com.webshop.Util.JsonUtil;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.stream.Collectors;

@WebServlet(name = "RegisterServlet")
public class RegisterServlet extends BaseServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        super.setAccessControlHeaders(response);
        String body = request.getReader().lines().collect(Collectors.joining());
        AuthRequestData authRequestData = (AuthRequestData) JsonUtil.getObjFromJson(body, AuthRequestData.class);
        Credentials credentials = authRequestData.getCredentials();
        if (credentials == null
            || credentials.getUsername() == null
            || credentials.getPassword() == null
            || credentials.getUsername().trim().length() == 0
            || credentials.getPassword().trim().length() == 0) {
            super.sendErrorResponse(
                    response,
                    HttpServletResponse.SC_BAD_REQUEST,
                    "Invalid request. Must supply login credentials."
            );
            return;
        }
        if (credentials.getPassword().length() < 6) {
            super.sendErrorResponse(
                    response,
                    HttpServletResponse.SC_BAD_REQUEST,
                    "Password needs to be at least 6 characters long."
            );
            return;
        }
        if (AuthManager.getInstance().usernameExists(credentials.getUsername())) {
            super.sendErrorResponse(
                    response,
                    HttpServletResponse.SC_BAD_REQUEST,
                    "Username already exists. Please use a different one."
            );
            return;
        }
        String uuid = UserDataManager.getInstance().insertUser(credentials.getUsername(), credentials.getPassword(), false);
        if (uuid == null) {
            super.sendErrorResponse(
                    response,
                    HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Failed to create new account."
            );
            return;
        }
        AuthTokenClient tokenClient = AuthManager.getInstance().getNewClientTokenAndCacheServerToken(credentials.getUsername(), credentials.getPassword());
        if (tokenClient == null) {
            super.sendErrorResponse(
                    response,
                    HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Failed to construct auth token for client."
            );
            return;
        }
        LoginLogManager.getInstance().logNewRegister(authRequestData);
        JsonObject responseData = JsonUtil.getJson(tokenClient, "token");
        super.printJsonResponse(response, responseData);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
}
