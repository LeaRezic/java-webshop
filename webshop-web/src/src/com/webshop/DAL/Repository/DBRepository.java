package src.com.webshop.DAL.Repository;

import src.com.webshop.DAL.Entities.*;
import src.com.webshop.DAL.EntityManagerFactoryUtil;
import src.com.webshop.Util.DummyLogger.LoggerUtil;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public class DBRepository implements Repository {

    private static DBRepository repo = null;
    private EntityManagerFactory emFactory;

    private DBRepository() {
        this.emFactory = EntityManagerFactoryUtil.getEmFactory();
    }
    
    public static DBRepository getInstance() {
        if (repo == null) {
            return new DBRepository();
        }
        return repo;
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

    private void insertEntity(EntityBase entity) {
        EntityManager em = null;
        try {
            em = emFactory.createEntityManager();
            em.getTransaction().begin();
            em.persist(entity);
            em.getTransaction().commit();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            if (em != null) {
                em.close();
            }
        }
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
    public List<ReceiptEntity> getReceiptsForCustomer(String userUuid) {
        UserAccountEntity user = getUserAccountByUUID(userUuid);
        EntityManager em = null;
        List<ReceiptEntity> receipts = null;
        try {
            StringBuilder sb = new StringBuilder();
            sb.append("FROM ")
                    .append(ReceiptEntity.class.getSimpleName())
                    .append(" WHERE user_account_id = ")
                    .append(user.giveId());
            em = emFactory.createEntityManager();
            em.getTransaction().begin();
            receipts = (List<ReceiptEntity>) em.createQuery(sb.toString()).getResultList();
            em.getTransaction().commit();
            em.close();
        } catch (Exception e) {
            if (em != null) {
                em.close();
            }
        }
        return receipts;
    }

    @Override
    public List<ReceiptItemEntity> getReceiptItemsForReceipt(int receiptId) {
        EntityManager em = null;
        List<ReceiptItemEntity> receiptItems = null;
        try {
            StringBuilder sb = new StringBuilder();
            sb.append("FROM ")
                    .append(ReceiptItemEntity.class.getSimpleName())
                    .append(" WHERE receipt_id = ")
                    .append(receiptId);
            em = emFactory.createEntityManager();
            em.getTransaction().begin();
            receiptItems = em.createQuery(sb.toString()).getResultList();
            em.getTransaction().commit();
            em.close();
        } catch (Exception e) {
            if (em != null) {
                em.close();
            }
        }
        return receiptItems;
    }

    @Override
    public List<UserDetailsEntity> getUsers() {
        return null;
    }

    @Override
    public ExpansionDetailsEntity getExpansionDetails(int expansionDetailsId) {
        return (ExpansionDetailsEntity)
                getEntityOfTypeById(
                        ExpansionDetailsEntity.class.getSimpleName(),
                        expansionDetailsId);
    }

    @Override
    public GameDetailsEntity getGameDetails(int gameDetailsId) {
        return (GameDetailsEntity)
                getEntityOfTypeById(
                        GameDetailsEntity.class.getSimpleName(),
                        gameDetailsId);
    }

    @Override
    public ProductEntity getProduct(int productId) {
        return (ProductEntity)
                getEntityOfTypeById(
                        ProductEntity.class.getSimpleName(),
                        productId);
    }

    @Override
    public ProductManufacturerEntity getManufacturer(int manufacturerId) {
        return (ProductManufacturerEntity)
                getEntityOfTypeById(
                        ProductManufacturerEntity.class.getSimpleName(),
                        manufacturerId);
    }

    @Override
    public ProductCategoryEntity getCategory(int categoryId) {
        return (ProductCategoryEntity)
                getEntityOfTypeById(
                        ProductCategoryEntity.class.getSimpleName(),
                        categoryId);
    }

    @Override
    public ProductSubcategoryEntity getSubcategory(int subcategoryId) {
        return (ProductSubcategoryEntity)
                getEntityOfTypeById(
                        ProductSubcategoryEntity.class.getSimpleName(),
                        subcategoryId);
    }

    @Override
    public ReceiptEntity getReceipt(int receiptId) {
        return (ReceiptEntity)
                getEntityOfTypeById(
                        ReceiptEntity.class.getSimpleName(),
                        receiptId);
    }

    @Override
    public ReceiptItemEntity getReceiptItem(int receiptItemId) {
        return (ReceiptItemEntity)
                getEntityOfTypeById(
                        ReceiptItemEntity.class.getSimpleName(),
                        receiptItemId);
    }

    @Override
    public RoleEntity getRole(int roleId) {
        return (RoleEntity)
                getEntityOfTypeById(
                        RoleEntity.class.getSimpleName(),
                        roleId);
    }

    @Override
    public UserAccountEntity getUserAccount(int userAccountId) {
        return (UserAccountEntity)
                getEntityOfTypeById(
                        UserAccountEntity.class.getSimpleName(),
                        userAccountId);
    }

    @Override
    public UserDetailsEntity getUserDetails(int userDetailsId) {
        return (UserDetailsEntity)
                getEntityOfTypeById(
                        UserDetailsEntity.class.getSimpleName(),
                        userDetailsId);
    }

    @Override
    public UserAccountEntity getUserAccountByUUID(String userAccountUUID) {
        EntityManager em = null;
        UserAccountEntity entity = null;
        try {
            StringBuilder sb = new StringBuilder();
            sb.append("FROM ")
                    .append(UserAccountEntity.class.getSimpleName())
                    .append(" WHERE uuid like '")
                    .append(userAccountUUID)
                    .append("'");
            em = emFactory.createEntityManager();
            em.getTransaction().begin();
            entity = (UserAccountEntity) em.createQuery(sb.toString()).getResultList().get(0);
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
    public boolean insertUser(UserAccountEntity entity) {
        entity.setUserAccountId(0);
        insertEntity(entity);
        UserAccountEntity newEntity = getUserAccountByUUID(entity.getUuid());
        return newEntity != null;
    }

    @Override
    public boolean insertLoginLog(LoginLogEntity entity) {
        try {
            insertEntity(entity);
            LoggerUtil.log("[DB REPO]: logged entity " + entity.getIpAddress());
            return true;
        } catch (Exception e) {
            LoggerUtil.log("[DB REPO]: something got fucked...");
            return false;
        }
    }

    @Override
    public UserAccountEntity getUserByUsername(String username) {
        EntityManager em = null;
        UserAccountEntity entity = null;
        try {
            StringBuilder sb = new StringBuilder();
            sb.append("FROM ")
                    .append(UserAccountEntity.class.getSimpleName())
                    .append(" WHERE email like '")
                    .append(username)
                    .append("'");
            em = emFactory.createEntityManager();
            em.getTransaction().begin();
            entity = (UserAccountEntity) em.createQuery(sb.toString()).getResultList().get(0);
            em.getTransaction().commit();
            em.close();
        } catch (Exception e) {
            if (em != null) {
                em.close();
            }
        }
        return entity;
    }
}
