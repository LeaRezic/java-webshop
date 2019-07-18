package src.com.webshop.Model.Receipt.CreateReceipt;

public class CreateReceiptItemData {

    private int productId;
    private int ammount;

    public CreateReceiptItemData(int productId, int ammount) {
        this.productId = productId;
        this.ammount = ammount;
    }

    public int getProductId() {
        return productId;
    }

    public int getAmmount() {
        return ammount;
    }
}
