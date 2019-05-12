package src.com.webshop.DAL.Repository;

import src.com.webshop.DAL.Entities.ProductCategoryEntity;
import src.com.webshop.DAL.Entities.ProductEntity;

import java.util.List;
import java.util.Locale;

public interface Repository {

    List<ProductEntity> getProducts();

    List<ProductCategoryEntity> getProductCategories();
}
