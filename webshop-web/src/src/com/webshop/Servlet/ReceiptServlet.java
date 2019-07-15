package src.com.webshop.Servlet;

import com.google.gson.JsonObject;
import src.com.webshop.Model.Auth.AuthTokenManager;
import src.com.webshop.Model.Auth.AuthTokenServer;
import src.com.webshop.Model.Receipt.ReceiptDetailedVM;
import src.com.webshop.Model.Receipt.ReceiptManager;
import src.com.webshop.Util.DummyLogger.LoggerUtil;
import src.com.webshop.Util.JsonUtil;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.ParseException;
import java.util.List;

@WebServlet(name = "ReceiptServlet")
public class ReceiptServlet extends BaseServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        super.setAccessControlHeaders(response);
        String authToken = super.getRequestAuthHeader(request);
        try {
            if (!AuthTokenManager.tokenValid(authToken)) {
                super.sendErrorResponse(
                        response,
                        HttpServletResponse.SC_UNAUTHORIZED,
                        "Authentication token is not valid."
                );
                return;
            }
        } catch (ParseException e) {
            super.sendErrorResponse(
                    response,
                    HttpServletResponse.SC_BAD_REQUEST,
                    "Error while parsing the authentication token."
            );
            return;
        }
        AuthTokenServer serverToken = AuthTokenManager.getExistingServerToken(authToken);
        List<ReceiptDetailedVM> receipts = ReceiptManager.getReceiptsDetailed(serverToken.getUserUuid());
        AuthTokenManager.updateExpireDate(authToken);
        super.printJsonResponse(response, JsonUtil.getJsonArray(receipts, "receipts"));
    }

}
