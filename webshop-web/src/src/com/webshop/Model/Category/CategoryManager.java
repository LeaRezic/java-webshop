package src.com.webshop.Model.Category;

import src.com.webshop.DAL.Entities.ProductCategoryEntity;
import src.com.webshop.DAL.Entities.ProductSubcategoryEntity;
import src.com.webshop.DAL.Repository.DBRepository;

import java.util.ArrayList;
import java.util.List;

public class CategoryManager {

    private static DBRepository repo = new DBRepository();

    public static List<CategoryVM> getAllCategories() {
        ArrayList<CategoryVM> list = new ArrayList<>();
        List<ProductCategoryEntity> categoryEntities = repo.getCategories();
        categoryEntities.forEach((entity) -> list.add(createCategoryVmFromEntity(entity)));
        return list;
    }

    private static CategoryVM createCategoryVmFromEntity(ProductCategoryEntity entity) {
        List<ProductSubcategoryEntity> subcatEntities = repo.getSubcategoriesForCategory(entity.giveId());
        List<SubcategoryVM> subcatVms = new ArrayList<>();
        subcatEntities.forEach((subcatEntity) -> subcatVms.add(createSubcatVMfromEntity(subcatEntity)));
        return new CategoryVM(
                entity.giveId(),
                entity.getName(),
                subcatVms
        );
    }

    private static SubcategoryVM createSubcatVMfromEntity(ProductSubcategoryEntity subcatEntity) {
        return new SubcategoryVM(
                subcatEntity.giveId(),
                subcatEntity.getName(),
                subcatEntity.getProductCategoryId()
        );
    }
}
