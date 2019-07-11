package src.com.webshop.Servlet;

import com.google.gson.JsonObject;
import src.com.webshop.Util.DummyLogger.LoggerUtil;
import src.com.webshop.Util.JsonUtil;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

public class BaseServlet extends HttpServlet {

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setAccessControlHeaders(resp);
        resp.setStatus(HttpServletResponse.SC_OK);
    }

    protected void setAccessControlHeaders(HttpServletResponse resp) {
        resp.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        resp.setHeader("Access-Control-Allow-Methods", "GET, POST");
        resp.setHeader("Access-Control-Max-Age", "86400");
        resp.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
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

    private Map<String, String> getHeadersInfo(HttpServletRequest request) {
        Map<String, String> map = new HashMap<>();
        Enumeration headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String key = (String) headerNames.nextElement();
            String value = request.getHeader(key);
            LoggerUtil.log(key + " " + value);
            map.put(key, value);
        }
        return map;
    }

    protected String getRequestAuthHeader(HttpServletRequest request) {
        Map<String, String> map = getHeadersInfo(request);
        String authHeaderValue = map.get("authorization");
        if (authHeaderValue == null) {
            return null;
        }
        String[] parts = authHeaderValue.split(":");
        if (parts.length <= 1) {
            return null;
        }
        return parts[1];
    }

}
