package src.com.webshop.Servlet;

import com.google.gson.JsonParseException;
import src.com.webshop.Model.Auth.AuthManager;
import src.com.webshop.Model.Auth.AuthToken.AuthTokenServer;
import src.com.webshop.Model.Receipt.CreateReceipt.CreateReceiptData;
import src.com.webshop.Model.Receipt.ReportReceipt.ReceiptDetailedVM;
import src.com.webshop.Model.Receipt.ReceiptManager;
import src.com.webshop.Util.HttpRequestUtil;
import src.com.webshop.Util.JsonResponseWriter;
import src.com.webshop.Util.JsonUtil;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "ReceiptServlet")
public class ReceiptServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String body = HttpRequestUtil.getRequestBody(request);
        CreateReceiptData createReceiptData;
        try {
            createReceiptData = (CreateReceiptData) JsonUtil.getObjFromJson(body, CreateReceiptData.class);
        } catch (JsonParseException e) {
            JsonResponseWriter.sendErrorResponse(
                    response,
                    HttpServletResponse.SC_BAD_REQUEST,
                    "Invalid POST data. Could not parse create receipt data.");
            return;
        }
        String authToken = HttpRequestUtil.getRequestAuthHeader(request);
        AuthTokenServer serverToken = AuthManager.getInstance().getExistingServerToken(authToken);
        if (createReceiptData.getMethod().equals("CASH")) {
            boolean valid = AuthManager.getInstance().validateCredentials(serverToken.getEmail(), createReceiptData.getPassword());
            if (!valid) {
                JsonResponseWriter.sendErrorResponse(
                        response,
                        HttpServletResponse.SC_UNAUTHORIZED,
                        "Invalid authorization"
                );
            }
        }
        String receiptNumber = ReceiptManager.getInstance().createNewReceipt(createReceiptData, serverToken.getEmail());
        JsonResponseWriter.printJsonResponse(response, JsonUtil.getJson(receiptNumber, "receiptNumber"));
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authToken = HttpRequestUtil.getRequestAuthHeader(request);
        AuthTokenServer serverToken = AuthManager.getInstance().getExistingServerToken(authToken);
        List<ReceiptDetailedVM> receipts;
        if (serverToken.isAdmin()) {
            receipts = ReceiptManager.getInstance().getAllReceipts();
        } else {
            receipts = ReceiptManager.getInstance().getReceiptForUser(serverToken.getUserUuid());
        }
        JsonResponseWriter.printJsonResponse(response, JsonUtil.getJsonArray(receipts, "receipts"));
    }

}
