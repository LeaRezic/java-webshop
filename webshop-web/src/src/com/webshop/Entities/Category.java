package src.com.webshop.Entities;

public class Category {
    private int id;
    private String name;
    private String description;
    private String pictureUrl;
    private int yearOfManufacture;
    private Subcategory subcategory;
    private Manufacturer manufacturer;

    public Category(int id, String name, String description, String pictureUrl, int yearOfManufacture, Subcategory subcategory, Manufacturer manufacturer) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.pictureUrl = pictureUrl;
        this.yearOfManufacture = yearOfManufacture;
        this.subcategory = subcategory;
        this.manufacturer = manufacturer;
    }

}
