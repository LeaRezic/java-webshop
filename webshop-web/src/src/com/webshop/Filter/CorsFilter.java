package src.com.webshop.Filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URL;
import java.net.URLConnection;

@WebFilter(filterName = "CorsFilter")
public class CorsFilter implements Filter {
    public void destroy() {
    }

    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws ServletException, IOException {
        String allowOrigin = determineAndGetOrigin(req);
        setAccessControlHeaders((HttpServletResponse) resp, allowOrigin);
        chain.doFilter(req, resp);
    }

    protected void setAccessControlHeaders(HttpServletResponse resp, String allowOrigin) {
        resp.setHeader("Access-Control-Allow-Origin", allowOrigin);
        resp.setHeader("Access-Control-Allow-Methods", "POST");
        resp.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
    }

    private String determineAndGetOrigin(ServletRequest req) {
        try {
            URL local = new URL("http://localhost:3000");
            URLConnection myURLConnection = local.openConnection();
            myURLConnection.connect();
            return req.getServletContext().getInitParameter("localAllowOrigin");
        }
        catch (IOException e) {
            return req.getServletContext().getInitParameter("remoteAllowOrigin");
        }
    }

    public void init(FilterConfig config) throws ServletException {

    }

}
