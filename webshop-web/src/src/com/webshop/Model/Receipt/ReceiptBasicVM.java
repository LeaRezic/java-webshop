package src.com.webshop.Model.Receipt;


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

    public String getNumber() {
        return number;
    }

    public boolean isCreditCard() {
        return creditCard;
    }

    public String getPurchaseDate() {
        return purchaseDate;
    }

    public int getTotalProducts() {
        return totalProducts;
    }

    public double getAmount() {
        return amount;
    }
}
