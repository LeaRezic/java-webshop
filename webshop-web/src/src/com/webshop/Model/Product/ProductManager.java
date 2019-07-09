package src.com.webshop.Model.Product;

import src.com.webshop.DAL.Entities.ProductEntity;
import src.com.webshop.DAL.Entities.ProductManufacturerEntity;
import src.com.webshop.DAL.Entities.ProductSubcategoryEntity;
import src.com.webshop.DAL.Repository.DBRepository;

import java.util.ArrayList;
import java.util.List;

public class ProductManager {

    private static DBRepository repo = new DBRepository();

    public static List<ProductBasicVM> getAllProducts() {
        List<ProductBasicVM> list = new ArrayList<>();
        List<ProductEntity> entities = repo.getProducts();
        entities.forEach((entity) -> list.add(createBasicVmFromEntity(entity)));
        return list;
    }

    private static ProductBasicVM createBasicVmFromEntity(ProductEntity entity) {
        return new ProductBasicVM(
                entity.giveId(),
                entity.getProductSubcategoryId(),
                entity.getName(),
                entity.getDescription(),
                entity.getPictureUrl(),
                entity.getPrice()
        );
    }

    public static ProductDetailedVM getProduct(int id) {
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
