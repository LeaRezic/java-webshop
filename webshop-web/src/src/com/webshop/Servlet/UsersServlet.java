package src.com.webshop.Servlet;

import src.com.webshop.Model.Auth.AuthManager;
import src.com.webshop.Model.Auth.AuthToken.AuthTokenServer;
import src.com.webshop.Model.UserData.UserDataVM;
import src.com.webshop.Model.UserData.UserManager;
import src.com.webshop.Util.JsonUtil;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "UsersServlet")
public class UsersServlet extends BaseServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        super.setAccessControlHeaders(response);
        if (super.sendAuthErrorIfApplies(request, response)) {
            return;
        }
        String authToken = super.getRequestAuthHeader(request);
        AuthTokenServer serverToken = AuthManager.getExistingServerToken(authToken);
        if (!serverToken.isAdmin()) {
            super.sendErrorResponse(
                    response,
                    HttpServletResponse.SC_UNAUTHORIZED,
                    "No permission for selected action."
            );
            return;
        }
        AuthManager.updateExpireDate(authToken);
        List<UserDataVM> users = UserManager.getUsersData();
        super.printJsonResponse(response, JsonUtil.getJsonArray(users, "users"));
    }
}
