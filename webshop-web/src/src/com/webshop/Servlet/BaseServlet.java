package src.com.webshop.Servlet;

import com.google.gson.JsonObject;
import src.com.webshop.Util.JsonUtil;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class BaseServlet extends HttpServlet {

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setAccessControlHeaders(resp);
        resp.setStatus(HttpServletResponse.SC_OK);
    }

    protected void setAccessControlHeaders(HttpServletResponse resp) {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        resp.setHeader("Access-Control-Allow-Methods", "GET");
        resp.setHeader("Access-Control-Allow-Methods", "POST");
    }

    protected void printJsonResponse(HttpServletResponse response, JsonObject jsonObject) throws IOException {
        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        out.print(jsonObject);
        out.flush();
    }

    protected void sendErrorResponse(HttpServletResponse response, int code, String errorMessage) throws IOException {
        response.setStatus(code);
        JsonObject jsonError = JsonUtil.getJson(errorMessage, "error");
        printJsonResponse(response, jsonError);
    }
}
