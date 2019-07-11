package src.com.webshop.DAL.Repository;

import src.com.webshop.DAL.Entities.*;

import java.util.List;

public interface Repository {

    List<ProductEntity> getProducts();
    List<ProductCategoryEntity> getCategories();
    List<ProductSubcategoryEntity> getSubcategoriesForCategory(int categoryId);
    List<ExpansionDetailsEntity> getExpansionsForGame(int gameDetailsId);
    List<ProductManufacturerEntity> getManufacturers();
    List<ReceiptEntity> getReceipts();
    List<ReceiptEntity> getReceiptsForCustomer(int userDetailsId);
    List<ReceiptItemEntity> getReceiptItemsForReceipt (int receiptId);
    List<UserDetailsEntity> getUsers();

    ExpansionDetailsEntity getExpansionDetails(int expansionDetailsId);
    GameDetailsEntity getGameDetails(int gameDetailsId);
    ProductEntity getProduct(int productId);
    ProductManufacturerEntity getManufacturer(int manufacturerId);
    ProductCategoryEntity getCategory(int categoryId);
    ProductSubcategoryEntity getSubcategory(int subcategoryId);
    ReceiptEntity getReceipt(int receiptId);
    ReceiptItemEntity getReceiptItem(int receiptItemId);
    RoleEntity getRole(int roleId);
    UserAccountEntity getUserAccount(int userAccountId);
    UserAccountEntity getUserAccountByUUID(String userAccountUUID);
    UserDetailsEntity getUserDetails(int userDetailsId);

    boolean insertUser(UserAccountEntity entity);

    UserAccountEntity getUserByUsername(String username);
}
