package src.com.webshop.Util;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

public class HttpRequestUtil {

    public static Map<String, String> getHeadersInfo(HttpServletRequest request) {
        Map<String, String> map = new HashMap<>();
        Enumeration headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String key = (String) headerNames.nextElement();
            String value = request.getHeader(key);
            map.put(key, value);
        }
        return map;
    }

    public static String getHeader(HttpServletRequest request, String headerName) {
        Map<String, String> map = getHeadersInfo(request);
        return map.get(headerName);
    }

    public static String getRequestAuthHeader(HttpServletRequest request) {
        String authHeaderValue = getHeader(request,"authorization");
        if (authHeaderValue == null) {
            return null;
        }
        String[] parts = authHeaderValue.split(":");
        if (parts.length <= 1) {
            return null;
        }
        return parts[1];
    }

    public static String getRequestBody(HttpServletRequest request) {
        String body = null;
        try (BufferedReader reader = request.getReader()) {
            body = reader.lines().collect(Collectors.joining());
            return body;
        } catch (IOException e) {
            e.printStackTrace();
            return body;
        }
    }

}
