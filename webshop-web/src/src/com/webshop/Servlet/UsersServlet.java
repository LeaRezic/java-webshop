package src.com.webshop.Servlet;

import src.com.webshop.Model.Auth.AuthToken.AuthTokenManager;
import src.com.webshop.Model.Auth.AuthToken.AuthTokenServer;
import src.com.webshop.Model.Auth.UserData.UserDetailedVM;
import src.com.webshop.Model.Auth.UserData.UserManager;
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
        AuthTokenServer serverToken = AuthTokenManager.getExistingServerToken(authToken);
        if (!serverToken.isAdmin()) {
            super.sendErrorResponse(
                    response,
                    HttpServletResponse.SC_UNAUTHORIZED,
                    "No permission for selected action."
            );
            return;
        }
        AuthTokenManager.updateExpireDate(authToken);
        List<UserDetailedVM> users = UserManager.getUsersDetailed();
        super.printJsonResponse(response, JsonUtil.getJsonArray(users, "users"));
    }
}
