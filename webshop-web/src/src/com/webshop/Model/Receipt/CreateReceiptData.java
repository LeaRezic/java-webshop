package src.com.webshop.Model.Receipt;

import java.util.List;

public class CreateReceiptData {

    public static String METHOD_CASH = "CASH";
    public static String METHOD_PAY_PAL = "PAY_PAL";

    private String method;
    private String username;
    private String password;
    private List<CreateReceiptItemData> receiptItems;

    public CreateReceiptData(String method, String username, String password, List<CreateReceiptItemData> receiptItems) {
        this.method = method;
        this.username = username;
        this.password = password;
        this.receiptItems = receiptItems;
    }

    public String getMethod() {
        return method;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public List<CreateReceiptItemData> getReceiptItems() {
        return receiptItems;
    }
}
