package src.com.webshop.Servlet;

import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;
import src.com.webshop.Model.Auth.*;
import src.com.webshop.Model.Auth.AuthToken.AuthTokenClient;
import src.com.webshop.Model.Auth.AuthManager;
import src.com.webshop.Model.LoginLog.LoginLogManager;
import src.com.webshop.Util.HttpRequestUtil;
import src.com.webshop.Util.JsonResponseWriter;
import src.com.webshop.Util.JsonUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "LoginServlet")
public class LoginServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String body = HttpRequestUtil.getRequestBody(request);
        AuthRequestData authRequestData;
        Credentials credentials = null;
        try {
            authRequestData = (AuthRequestData)  JsonUtil.getObjFromJson(body, AuthRequestData.class);
            credentials = authRequestData.getCredentials();
        } catch (JsonParseException e) {
            JsonResponseWriter.sendErrorResponse(
                    response,
                    HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Error while parsing login credentials."
            );
            return;
        }
        if (credentials == null) {
            JsonResponseWriter.sendErrorResponse(
                    response,
                    HttpServletResponse.SC_BAD_REQUEST,
                    "Invalid request. Must supply login credentials."
            );
            return;
        }
        if (!AuthManager.getInstance().validateCredentials(credentials.getUsername(), credentials.getPassword())) {
            JsonResponseWriter.sendErrorResponse(
                    response,
                    HttpServletResponse.SC_BAD_REQUEST,
                    "Invalid Credentials. User does not exist or password is incorrect."
            );
            return;
        }
        AuthTokenClient tokenClient = AuthManager.getInstance().getNewClientTokenAndCacheServerToken(credentials.getUsername(), credentials.getPassword());
        if (tokenClient == null) {
            JsonResponseWriter.sendErrorResponse(
                    response,
                    HttpServletResponse.SC_BAD_REQUEST,
                    "Failed to construct auth token for client."
            );
            return;
        }
        LoginLogManager.getInstance().logNewLogin(authRequestData);
        JsonObject responseData = JsonUtil.getJson(tokenClient, "token");
        JsonResponseWriter.printJsonResponse(response, responseData);
    }

}
