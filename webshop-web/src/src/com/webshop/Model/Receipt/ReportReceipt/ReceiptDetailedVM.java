package src.com.webshop.Model.Receipt.ReportReceipt;

import java.util.List;

public class ReceiptDetailedVM {

    private String username;
    private ReceiptBasicVM basic;
    private List<ReceiptItemVM> items;

    public ReceiptDetailedVM(String username, ReceiptBasicVM basic, List<ReceiptItemVM> items) {
        this.username = username;
        this.basic = basic;
        this.items = items;
    }

    public String getUsername() {
        return username;
    }

    public ReceiptBasicVM getBasic() {
        return basic;
    }

}
