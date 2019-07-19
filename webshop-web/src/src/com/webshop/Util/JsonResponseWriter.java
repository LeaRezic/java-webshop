package src.com.webshop.Util;

import com.google.gson.JsonObject;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class JsonResponseWriter {

    public static void printJsonResponse(HttpServletResponse response, JsonObject jsonObject) throws IOException {
        try (PrintWriter out = response.getWriter()) {
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            out.print(jsonObject);
            out.flush();
        }
    }

    public static void sendErrorResponse(HttpServletResponse response, int code, String errorMessage) throws IOException {
        response.setStatus(code);
        JsonObject jsonError = JsonUtil.getJson(errorMessage, "error");
        printJsonResponse(response, jsonError);
    }

}
