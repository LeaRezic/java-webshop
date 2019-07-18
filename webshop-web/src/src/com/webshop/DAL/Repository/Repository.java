package src.com.webshop.DAL.Repository;

import src.com.webshop.DAL.Entities.*;

import java.util.List;

public interface Repository {

    List<ProductEntity> getProducts();
    List<ProductCategoryEntity> getCategories();
    List<ReceiptEntity> getReceipts();
    List<UserAccountEntity> getUsers();
    List<LoginLogEntity> getLoginLogs();

    RoleEntity getRole(int roleId);
    UserAccountEntity getUserAccount(int userAccountId);
    ProductEntity getProduct(int productId);
    ProductManufacturerEntity getManufacturer(int manufacturerId);
    ProductSubcategoryEntity getSubcategory(int subcategoryId);

    List<ReceiptEntity> getReceiptsForCustomer(String userUuid);
    List<ReceiptItemEntity> getReceiptItemsForReceipt (int receiptId);
    List<ProductSubcategoryEntity> getSubcategoriesForCategory(int categoryId);

    UserAccountEntity getUserAccountByUUID(String userAccountUUID);
    UserAccountEntity getUserByUsername(String username);

    boolean insertUser(UserAccountEntity entity);
    boolean insertLoginLog(LoginLogEntity entity);
    int insertReceipt(ReceiptEntity receiptEntity);
    void insertReceiptItem(ReceiptItemEntity receiptItemEntity);
}
