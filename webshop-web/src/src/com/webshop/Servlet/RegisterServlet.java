package src.com.webshop.Servlet;

import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;
import src.com.webshop.Model.Auth.*;
import src.com.webshop.Model.Auth.AuthToken.AuthTokenClient;
import src.com.webshop.Model.Auth.AuthManager;
import src.com.webshop.Model.LoginLog.LoginLogManager;
import src.com.webshop.Model.UserData.UserDataManager;
import src.com.webshop.Util.HttpRequestUtil;
import src.com.webshop.Util.JsonResponseWriter;
import src.com.webshop.Util.JsonUtil;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "RegisterServlet")
public class RegisterServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String body = HttpRequestUtil.getRequestBody(request);
        AuthRequestData authRequestData;
        Credentials credentials;
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
        if (credentials == null
            || credentials.getUsername() == null
            || credentials.getPassword() == null
            || credentials.getUsername().trim().length() == 0
            || credentials.getPassword().trim().length() == 0) {
            JsonResponseWriter.sendErrorResponse(
                    response,
                    HttpServletResponse.SC_BAD_REQUEST,
                    "Invalid request. Must supply login credentials."
            );
            return;
        }
        if (credentials.getPassword().length() < 6) {
            JsonResponseWriter.sendErrorResponse(
                    response,
                    HttpServletResponse.SC_BAD_REQUEST,
                    "Password needs to be at least 6 characters long."
            );
            return;
        }
        if (AuthManager.getInstance().usernameExists(credentials.getUsername())) {
            JsonResponseWriter.sendErrorResponse(
                    response,
                    HttpServletResponse.SC_BAD_REQUEST,
                    "Username already exists. Please use a different one."
            );
            return;
        }
        String uuid = UserDataManager.getInstance().insertUser(credentials.getUsername(), credentials.getPassword(), false);
        if (uuid == null) {
            JsonResponseWriter.sendErrorResponse(
                    response,
                    HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Failed to create new account."
            );
            return;
        }
        AuthTokenClient tokenClient = AuthManager.getInstance().getNewClientTokenAndCacheServerToken(credentials.getUsername(), credentials.getPassword());
        if (tokenClient == null) {
            JsonResponseWriter.sendErrorResponse(
                    response,
                    HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    "Failed to construct auth token for client."
            );
            return;
        }
        LoginLogManager.getInstance().logNewRegister(authRequestData);
        JsonObject responseData = JsonUtil.getJson(tokenClient, "token");
        JsonResponseWriter.printJsonResponse(response, responseData);
    }

}
