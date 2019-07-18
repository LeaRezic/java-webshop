package src.com.webshop.Model.Shop.Product;

public class ProductBasicVM {

    private int id;
    private int subcategoryId;
    private String name;
    private String description;
    private String pictureUrl;
    private double price;

    public ProductBasicVM(int id, int subcategoryId, String name, String description, String pictureUrl, double price) {
        this.id = id;
        this.subcategoryId = subcategoryId;
        this.name = name;
        this.description = description;
        this.pictureUrl = pictureUrl;
        this.price = price;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public double getPrice() {
        return price;
    }
}
