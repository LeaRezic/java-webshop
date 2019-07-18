package src.com.webshop.Servlet;

import com.google.gson.JsonObject;
import src.com.webshop.Model.Auth.AuthManager;
import src.com.webshop.Util.JsonUtil;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.text.ParseException;
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
        String allowOrigin = determineAndGetOrigin();
        resp.setHeader("Access-Control-Allow-Origin", allowOrigin);
        resp.setHeader("Access-Control-Allow-Methods", "POST");
        resp.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
    }

    private String determineAndGetOrigin() {
        try {
            URL local = new URL("http://localhost:3000");
            URLConnection myURLConnection = local.openConnection();
            myURLConnection.connect();
            return getServletContext().getInitParameter("localAllowOrigin");
        }
        catch (MalformedURLException e) {
            return getServletContext().getInitParameter("remoteAllowOrigin");
        } catch (IOException e) {
            return getServletContext().getInitParameter("remoteAllowOrigin");
        }
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

    protected boolean sendAuthErrorIfApplies(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authToken = getRequestAuthHeader(request);
        try {
            if (!AuthManager.getInstance().tokenValid(authToken)) {
                sendErrorResponse(
                        response,
                        HttpServletResponse.SC_UNAUTHORIZED,
                        "Authentication token is not valid."
                );
                return true;
            }
        } catch (ParseException | IOException e) {
                sendErrorResponse(
                    response,
                    HttpServletResponse.SC_BAD_REQUEST,
                    "Error while parsing the authentication token."
            );
            return true;
        }
        return false;
    }

}
