package src.com.webshop.Model.Receipt.ReportReceipt;


public class ReceiptBasicVM {

    private int id;
    private String number;
    private boolean creditCard;
    private String purchaseDate;
    private int totalProducts;
    private double amount;

    public ReceiptBasicVM(int id, String number, boolean creditCard, String purchaseDate, int totalProducts, double amount) {
        this.id = id;
        this.number = number;
        this.creditCard = creditCard;
        this.purchaseDate = purchaseDate;
        this.totalProducts = totalProducts;
        this.amount = amount;
    }

    public int getId() {
        return id;
    }

}
