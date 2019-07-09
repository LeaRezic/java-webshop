package src.com.webshop.DAL.Repository;

import src.com.webshop.DAL.Entities.*;
import src.com.webshop.DAL.EntityManagerFactoryUtil;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import java.util.List;
import java.util.stream.Collectors;

public class DBRepository implements Repository {

    private EntityManagerFactory emFactory;

    public DBRepository() {
        this.emFactory = EntityManagerFactoryUtil.getEmFactory();
    }

    private List<?> getAllEntitiesOfType(String className) {
        EntityManager em = null;
        List<?> entities = null;
        try {
            em = emFactory.createEntityManager();
            em.getTransaction().begin();
            entities = em.createQuery("FROM " + className).getResultList();
            em.getTransaction().commit();
            em.close();
            return entities;
        } catch (Exception e) {
            if (em != null) {
                em.close();
            }
        }
        return entities;
    }

    private EntityBase getEntityOfTypeById(String className, int id) {
        EntityManager em = null;
        EntityBase entity = null;
        try {
            StringBuilder sb = new StringBuilder();
            sb.append("FROM ").append(className).append(" WHERE id = ").append(id);
            em = emFactory.createEntityManager();
            em.getTransaction().begin();
            entity = (EntityBase) em.createQuery(sb.toString()).getResultList().get(0);
            em.getTransaction().commit();
            em.close();
        } catch (Exception e) {
            if (em != null) {
                em.close();
            }
        }
        return entity;
    }

    @Override
    public List<ProductEntity> getProducts() {
        return (List<ProductEntity>) getAllEntitiesOfType(ProductEntity.class.getSimpleName());
    }

    @Override
    public List<ProductCategoryEntity> getCategories() {
        return (List<ProductCategoryEntity>) getAllEntitiesOfType(ProductCategoryEntity.class.getSimpleName());
    }

    @Override
    public List<ProductSubcategoryEntity> getSubcategoriesForCategory(int categoryId) {
        List<ProductSubcategoryEntity> subcats =
                (List<ProductSubcategoryEntity>) getAllEntitiesOfType(ProductSubcategoryEntity.class.getSimpleName());
        return subcats.stream()
                .filter((sub) -> sub.getProductCategoryId() == categoryId)
                .collect(Collectors.toList());
    }

    @Override
    public List<ExpansionDetailsEntity> getExpansionsForGame(int gameDetailsId) {
        return null;
    }

    @Override
    public List<ProductManufacturerEntity> getManufacturers() {
        return null;
    }

    @Override
    public List<ReceiptEntity> getReceipts() {
        return null;
    }

    @Override
    public List<ReceiptEntity> getReceiptsForCustomer(int userDetailsId) {
        return null;
    }

    @Override
    public List<ReceiptItemEntity> getReceiptItemsForReceipt(int receiptId) {
        return null;
    }

    @Override
    public List<UserDetailsEntity> getUsers() {
        return null;
    }

    @Override
    public ExpansionDetailsEntity getExpansionDetails(int expansionDetailsId) {
        return null;
    }

    @Override
    public GameDetailsEntity getGameDetails(int gameDetailsId) {
        return null;
    }

    @Override
    public ProductEntity getProduct(int productId) {
        return null;
    }

    @Override
    public ProductManufacturerEntity getManufacturer(int manufacturerId) {
        return null;
    }

    @Override
    public ProductCategoryEntity getCategory(int categoryId) {
        return null;
    }

    @Override
    public ProductSubcategoryEntity getSubcategory(int subcategoryId) {
        return null;
    }

    @Override
    public ReceiptEntity getReceipt(int receiptId) {
        return null;
    }

    @Override
    public ReceiptItemEntity getReceiptItem(int receiptItemId) {
        return null;
    }

    @Override
    public RoleEntity getRole(int roleId) {
        return null;
    }

    @Override
    public UserAccountEntity getUserAccount(int userAccountId) {
        return null;
    }

    @Override
    public UserDetailsEntity getUserDetails(int userDetailsId) {
        return null;
    }
}
