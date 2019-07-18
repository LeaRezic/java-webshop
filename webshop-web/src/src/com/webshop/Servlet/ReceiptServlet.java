package src.com.webshop.Servlet;

import src.com.webshop.Model.Auth.AuthManager;
import src.com.webshop.Model.Auth.AuthToken.AuthTokenServer;
import src.com.webshop.Model.Receipt.CreateReceipt.CreateReceiptData;
import src.com.webshop.Model.Receipt.ReportReceipt.ReceiptDetailedVM;
import src.com.webshop.Model.Receipt.ReceiptManager;
import src.com.webshop.Util.JsonUtil;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@WebServlet(name = "ReceiptServlet")
public class ReceiptServlet extends BaseServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        super.setAccessControlHeaders(response);
        if (super.sendAuthErrorIfApplies(request, response)) {
            return;
        }
        String body = request.getReader().lines().collect(Collectors.joining());
        CreateReceiptData createReceiptData = (CreateReceiptData) JsonUtil.getObjFromJson(body, CreateReceiptData.class);
        String authToken = super.getRequestAuthHeader(request);
        AuthTokenServer serverToken = AuthManager.getInstance().getExistingServerToken(authToken);
        if (createReceiptData.getMethod().equals(CreateReceiptData.METHOD_CASH)) {
            if (!AuthManager.getInstance().validateCredentials(serverToken.getEmail(), createReceiptData.getPassword())) {
                super.sendErrorResponse(
                        response,
                        HttpServletResponse.SC_BAD_REQUEST,
                        "Invalid Credentials."
                );
                return;
            }
        }
        String receiptNumber = ReceiptManager.getInstance().createNewReceipt(createReceiptData, serverToken.getEmail());
        super.printJsonResponse(response, JsonUtil.getJson(receiptNumber, "receiptNumber"));
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        super.setAccessControlHeaders(response);
        if (super.sendAuthErrorIfApplies(request, response)) {
            return;
        }
        String authToken = super.getRequestAuthHeader(request);
        AuthTokenServer serverToken = AuthManager.getInstance().getExistingServerToken(authToken);
        List<ReceiptDetailedVM> receipts;
        if (serverToken.isAdmin()) {
            receipts = ReceiptManager.getInstance().getAllReceipts();
        } else {
            receipts = ReceiptManager.getInstance().getReceiptForUser(serverToken.getUserUuid());
        }
        AuthManager.getInstance().updateExpireDate(authToken);
        super.printJsonResponse(response, JsonUtil.getJsonArray(receipts, "receipts"));
    }

}
