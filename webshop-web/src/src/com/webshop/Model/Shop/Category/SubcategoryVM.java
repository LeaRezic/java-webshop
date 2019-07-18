package src.com.webshop.Model.Shop.Category;

public class SubcategoryVM {

    private int id;
    private String name;
    private int categoryId;

    public SubcategoryVM(int id, String name, int categoryId) {
        this.id = id;
        this.name = name;
        this.categoryId = categoryId;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

}
