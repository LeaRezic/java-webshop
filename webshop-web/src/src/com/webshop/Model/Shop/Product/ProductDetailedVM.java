package src.com.webshop.Model.Shop.Product;

public class ProductDetailedVM {

    private ProductBasicVM basic;
    private String subcategoryName;
    private String manufacturerName;
    private int manufacturerId;
    private String externalUrl;

    public ProductDetailedVM(ProductBasicVM basic, String subcategoryName, String manufacturerName, int productManufacturerId, String externalUrl) {
        this.basic = basic;
        this.subcategoryName = subcategoryName;
        this.manufacturerName = manufacturerName;
        this.manufacturerId = productManufacturerId;
        this.externalUrl = externalUrl;
    }

    public ProductBasicVM getBasic() {
        return basic;
    }

}
