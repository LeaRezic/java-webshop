package src.com.webshop.Model.Receipt.ReportReceipt;

public class ReceiptItemVM {

    private int id;
    private int receiptId;
    private int productId;
    private String productName;
    private String pictureUrl;
    private double productPrice;
    private int amount;

    public ReceiptItemVM(int id, int receiptId, int productId, String productName, String productUrl, double productPrice, int amount) {
        this.id = id;
        this.receiptId = receiptId;
        this.productId = productId;
        this.productName = productName;
        this.pictureUrl = productUrl;
        this.productPrice = productPrice;
        this.amount = amount;
    }

    public int getId() {
        return id;
    }

    public int getAmount() {
        return amount;
    }

    public int getProductId() {
        return productId;
    }
}
