package src.com.webshop.Models.Category;

import java.util.ArrayList;
import java.util.List;

public class CategoryVM {

    private int id;
    private String name;
    private List<SubcategoryVM> subcategories;

    public CategoryVM(int id, String name, List<SubcategoryVM> subcategories) {
        this.subcategories = new ArrayList<>();
        this.id = id;
        this.name = name;
        this.subcategories = subcategories;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<SubcategoryVM> getSubcategories() {
        return subcategories;
    }
}
