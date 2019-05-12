package src.com.webshop.DAL.Repository;

import src.com.webshop.DAL.Entities.ProductCategoryEntity;
import src.com.webshop.DAL.Entities.ProductEntity;

import java.util.ArrayList;
import java.util.List;

public class MockRepository implements Repository {
    @Override
    public List<ProductEntity> getProducts() {
        List<ProductEntity> products = new ArrayList<>();
        return products;
    }

    @Override
    public List<ProductCategoryEntity> getProductCategories() {
        return null;
    }
}
