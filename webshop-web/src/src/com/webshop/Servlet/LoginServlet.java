package src.com.webshop.Servlet;

import com.google.gson.JsonObject;
import src.com.webshop.Model.Auth.UserVM;
import src.com.webshop.Util.JsonUtil;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Scanner;

@WebServlet(name = "LoginServlet")
public class LoginServlet extends BaseServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        super.setAccessControlHeaders(response);
        String userName = request.getParameter("username");
        String password = request.getParameter("password");
        UserVM user = new UserVM("test", false);
        JsonObject responseData = JsonUtil.getJson(user, "user");
        super.printJsonResponse(response, responseData);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        super.setAccessControlHeaders(response);
    }

    static String extractPostRequestBody(HttpServletRequest request) {
        if ("POST".equalsIgnoreCase(request.getMethod())) {
            Scanner s = null;
            try {
                s = new Scanner(request.getInputStream(), "UTF-8").useDelimiter("\\A");
            } catch (IOException e) {
                e.printStackTrace();
            }
            return s.hasNext() ? s.next() : "";
        }
        return "";
    }
}
