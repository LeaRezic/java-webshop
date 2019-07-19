package src.com.webshop.Filter;

import src.com.webshop.Model.Auth.AuthManager;
import src.com.webshop.Util.HttpRequestUtil;
import src.com.webshop.Util.JsonResponseWriter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.ParseException;

@WebFilter(filterName = "TokenFilter")
public class TokenFilter implements Filter {
    public void destroy() {
    }

    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
        if (!((HttpServletRequest) req).getMethod().equals("POST")) {
            chain.doFilter(req, resp);
            return;
        }
        String authToken = HttpRequestUtil.getRequestAuthHeader((HttpServletRequest) req);
        if (authToken == null) {
            JsonResponseWriter.sendErrorResponse(
                    (HttpServletResponse) resp,
                    HttpServletResponse.SC_BAD_REQUEST,
                    "Could not extract authentication token."
            );
            return;
        }
        try {
            if (!AuthManager.getInstance().tokenValid(authToken)) {
                JsonResponseWriter.sendErrorResponse(
                        (HttpServletResponse) resp,
                        HttpServletResponse.SC_UNAUTHORIZED,
                        "Authentication token is not valid."
                );
                return;
            }
        } catch (ParseException | IOException e) {
            JsonResponseWriter.sendErrorResponse(
                    (HttpServletResponse) resp,
                    HttpServletResponse.SC_BAD_REQUEST,
                    "Error while parsing the authentication token."
            );
            return;
        }
        chain.doFilter(req, resp);
    }

    public void init(FilterConfig config) throws ServletException {

    }

}
