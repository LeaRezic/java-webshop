package src.com.webshop.Model.Shop.Product;

import src.com.webshop.DAL.Entities.ProductEntity;
import src.com.webshop.DAL.Entities.ProductManufacturerEntity;
import src.com.webshop.DAL.Entities.ProductSubcategoryEntity;
import src.com.webshop.DAL.Repository.DBRepository;
import src.com.webshop.DAL.Repository.Repository;

import java.util.ArrayList;
import java.util.List;

public class ProductManager {

    private static ProductManager productManager = null;
    private Repository repo;
    private ProductManager() {
        repo = DBRepository.getInstance();
    }
    public static ProductManager getInstance() {
        if (productManager == null) {
            return new ProductManager();
        }
        return productManager;
    }

    public List<ProductBasicVM> getAllProducts() {
        List<ProductBasicVM> models = new ArrayList<>();
        List<ProductEntity> entities = repo.getProducts();
        entities.forEach((entity) -> models.add(createBasicVmFromEntity(entity)));
        return models;
    }

    private ProductBasicVM createBasicVmFromEntity(ProductEntity entity) {
        return new ProductBasicVM(
                entity.giveId(),
                entity.getProductSubcategoryId(),
                entity.getName(),
                entity.getDescription(),
                entity.getPictureUrl(),
                entity.getPrice()
        );
    }

    public ProductDetailedVM getProduct(int id) {
        ProductEntity entity = repo.getProduct(id);
        ProductManufacturerEntity manufacturerEntity = repo.getManufacturer(entity.getProductManufacturerId());
        ProductSubcategoryEntity subcategoryEntity = repo.getSubcategory(entity.getProductSubcategoryId());
        return new ProductDetailedVM(
                createBasicVmFromEntity(entity),
                subcategoryEntity.getName(),
                manufacturerEntity.getName(),
                entity.getProductManufacturerId(),
                entity.getExternalUrl()
        );
    }
}
