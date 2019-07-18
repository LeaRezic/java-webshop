package src.com.webshop.Model.Shop.Category;

import src.com.webshop.DAL.Entities.ProductCategoryEntity;
import src.com.webshop.DAL.Entities.ProductSubcategoryEntity;
import src.com.webshop.DAL.Repository.DBRepository;
import src.com.webshop.DAL.Repository.Repository;

import java.util.ArrayList;
import java.util.List;

public class CategoryManager {

    private static CategoryManager categoryManager = null;
    private Repository repo;
    private CategoryManager() {
        repo = DBRepository.getInstance();
    }
    public static CategoryManager getInstance() {
        if (categoryManager == null) {
            return new CategoryManager();
        }
        return categoryManager;
    }

    public List<CategoryVM> getAllCategories() {
        ArrayList<CategoryVM> categoryVMS = new ArrayList<>();
        List<ProductCategoryEntity> categoryEntities = repo.getCategories();
        categoryEntities.forEach((entity) -> categoryVMS.add(categoryVmFromEntity(entity)));
        return categoryVMS;
    }

    private CategoryVM categoryVmFromEntity(ProductCategoryEntity entity) {
        List<ProductSubcategoryEntity> subcategoryEntities = repo.getSubcategoriesForCategory(entity.giveId());
        List<SubcategoryVM> subcategoryVMS = new ArrayList<>();
        subcategoryEntities.forEach((subcategoryEntity) -> subcategoryVMS.add(subcategoryVmFromEntity(subcategoryEntity)));
        return new CategoryVM(
                entity.giveId(),
                entity.getName(),
                subcategoryVMS
        );
    }

    private SubcategoryVM subcategoryVmFromEntity(ProductSubcategoryEntity subcatEntity) {
        return new SubcategoryVM(
                subcatEntity.giveId(),
                subcatEntity.getName(),
                subcatEntity.getProductCategoryId()
        );
    }
}
