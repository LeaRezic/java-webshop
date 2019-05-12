package src.com.webshop.DAL.Repository;

import src.com.webshop.DAL.Entities.*;

import java.util.ArrayList;
import java.util.List;

public class MockRepository implements Repository {
    @Override
    public List<ProductEntity> getProducts() {
        List<ProductEntity> products = new ArrayList<>();
        return products;
    }

    @Override
    public List<ProductCategoryEntity> getCategories() {
        return null;
    }

    @Override
    public List<ProductSubcategoryEntity> getSubcategoriesForCategory(int categoryId) {
        return null;
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
