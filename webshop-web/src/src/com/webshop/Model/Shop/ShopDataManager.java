package src.com.webshop.Model.Shop;

import src.com.webshop.Model.Shop.Category.CategoryManager;
import src.com.webshop.Model.Shop.Product.ProductManager;

public class ShopDataManager {

    private static ShopDataManager shopDataManger = null;
    private ShopDataManager() { }

    public static ShopDataManager getInstance() {
        if (shopDataManger == null) {
            return new ShopDataManager();
        }
        return shopDataManger;
    }

    public ShopDataVM getShopData() {
        return new ShopDataVM(
                CategoryManager.getInstance().getAllCategories(),
                ProductManager.getInstance().getAllProducts()
        );
    }
}
