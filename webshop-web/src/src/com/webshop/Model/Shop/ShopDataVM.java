package src.com.webshop.Model.Shop;

import src.com.webshop.Model.Shop.Category.CategoryVM;
import src.com.webshop.Model.Shop.Product.ProductBasicVM;

import java.util.List;

public class ShopDataVM {

    private List<CategoryVM> categories;
    private List<ProductBasicVM> products;

    public ShopDataVM(List<CategoryVM> categories, List<ProductBasicVM> products) {
        this.categories = categories;
        this.products = products;
    }

}
