package src.com.webshop.Model.Shop;

import src.com.webshop.Model.Shop.Category.CategoryManager;
import src.com.webshop.Model.Shop.Product.ProductManager;

public class ShopDataManager {

    public static ShopDataVM getShopData() {
        return new ShopDataVM(
                CategoryManager.getAllCategories(),
                ProductManager.getAllProducts()
        );
    }
}
