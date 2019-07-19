package src.com.webshop.Servlet;

import src.com.webshop.Model.LoginLog.LoginLogManager;
import src.com.webshop.Model.LoginLog.LoginLogVM;
import src.com.webshop.Util.JsonResponseWriter;
import src.com.webshop.Util.JsonUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "LoginLogServlet")
public class LoginLogServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        List<LoginLogVM> logs = LoginLogManager.getInstance().getLoginLogs();
        JsonResponseWriter.printJsonResponse(response, JsonUtil.getJsonArray(logs, "logs"));
    }
}
