package src.com.webshop.Model.Receipt;

import java.util.List;

public class CreateReceiptData {

    private String password;
    private boolean creditCard;
    private List<CreateReceiptItemData> receiptItems;

    public CreateReceiptData(String password, List<CreateReceiptItemData> items) {
        this.password = password;
        this.receiptItems = items;
    }

    public String getPassword() {
        return password;
    }

    public boolean isCreditCard() {
        return creditCard;
    }

    public List<CreateReceiptItemData> getReceiptItems() {
        return receiptItems;
    }
}
