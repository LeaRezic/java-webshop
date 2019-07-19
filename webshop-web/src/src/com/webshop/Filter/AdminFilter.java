package src.com.webshop.Filter;

import src.com.webshop.Model.Auth.AuthManager;
import src.com.webshop.Model.Auth.AuthToken.AuthTokenServer;
import src.com.webshop.Util.HttpRequestUtil;
import src.com.webshop.Util.JsonResponseWriter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.ParseException;

@WebFilter(filterName = "AdminFilter")
public class AdminFilter implements Filter {
    public void destroy() {
    }

    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws ServletException, IOException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse resp = (HttpServletResponse) response;
        if (!req.getMethod().equals("POST")) {
            chain.doFilter(req, response);
            return;
        }
        String authToken = HttpRequestUtil.getRequestAuthHeader((HttpServletRequest) req);
        if (authToken == null) {
            JsonResponseWriter.sendErrorResponse(
                    resp,
                    HttpServletResponse.SC_BAD_REQUEST,
                    "Could not extract authentication token."
            );
            return;
        }
        AuthTokenServer serverToken;
        try {
            if (!AuthManager.getInstance().tokenValid(authToken)) {
                JsonResponseWriter.sendErrorResponse(
                        resp,
                        HttpServletResponse.SC_UNAUTHORIZED,
                        "Authentication token is not valid."
                );
                return;
            }
            serverToken = AuthManager.getInstance().getExistingServerToken(authToken);
            if (!serverToken.isAdmin()) {
                JsonResponseWriter.sendErrorResponse(
                        resp,
                        HttpServletResponse.SC_UNAUTHORIZED,
                        "No permission for selected action."
                );
                return;
            }
        } catch (ParseException | IOException e) {
            JsonResponseWriter.sendErrorResponse(
                    resp,
                    HttpServletResponse.SC_BAD_REQUEST,
                    "Error while parsing the authentication token."
            );
            return;
        }
        AuthManager.getInstance().updateExpireDate(serverToken.getTokenId());
        chain.doFilter(req, resp);
    }

    public void init(FilterConfig config) throws ServletException {

    }

}
