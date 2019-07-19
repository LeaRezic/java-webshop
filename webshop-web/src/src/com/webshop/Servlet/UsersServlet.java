package src.com.webshop.Servlet;

import src.com.webshop.Model.UserData.UserDataVM;
import src.com.webshop.Model.UserData.UserDataManager;
import src.com.webshop.Util.JsonResponseWriter;
import src.com.webshop.Util.JsonUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "UsersServlet")
public class UsersServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        List<UserDataVM> users = UserDataManager.getInstance().getUsersData();
        JsonResponseWriter.printJsonResponse(response, JsonUtil.getJsonArray(users, "users"));
    }
}
