package src.com.webshop.Model.Receipt;

import src.com.webshop.DAL.Entities.ReceiptEntity;
import src.com.webshop.DAL.Entities.ReceiptItemEntity;
import src.com.webshop.DAL.Entities.UserAccountEntity;
import src.com.webshop.DAL.Repository.DBRepository;
import src.com.webshop.DAL.Repository.Repository;
import src.com.webshop.Model.Receipt.CreateReceipt.CreateReceiptData;
import src.com.webshop.Model.Receipt.CreateReceipt.CreateReceiptItemData;
import src.com.webshop.Model.Receipt.ReportReceipt.ReceiptBasicVM;
import src.com.webshop.Model.Receipt.ReportReceipt.ReceiptDetailedVM;
import src.com.webshop.Model.Receipt.ReportReceipt.ReceiptItemVM;
import src.com.webshop.Model.Shop.Product.ProductDetailedVM;
import src.com.webshop.Model.Shop.Product.ProductManager;
import src.com.webshop.Util.ReceiptNumberGenerator;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ReceiptManager {

    private static ReceiptManager receiptManager = null;
    private Repository repo;
    private ReceiptManager() {
        repo = DBRepository.getInstance();
    }
    public static ReceiptManager getInstance() {
        if (receiptManager == null) {
            return new ReceiptManager();
        }
        return receiptManager;
    }

    public List<ReceiptDetailedVM> getAllReceipts() {
        List<ReceiptEntity> entities = repo.getReceipts();
        List<ReceiptDetailedVM> receipts = new ArrayList<>();
        for (ReceiptEntity entity : entities) {
            List<ReceiptItemVM> items = getItemsForReceipt(entity.getReceiptId());
            ReceiptDetailedVM detailedReceipt = new ReceiptDetailedVM(
                    repo.getUserAccount(entity.getUserAccountId()).getEmail(),
                    getBasicVmFromEntity(entity, items),
                    items
            );
            receipts.add(detailedReceipt);
        }
        return receipts;
    }

    public List<ReceiptDetailedVM> getReceiptForUser(String uuid) {
        UserAccountEntity user = repo.getUserAccountByUUID(uuid);
        String email = user.getEmail();
        List<ReceiptEntity> entities = repo.getReceiptsForCustomer(uuid);
        List<ReceiptDetailedVM> receipts = new ArrayList<>();
        for (ReceiptEntity entity : entities) {
            List<ReceiptItemVM> items = getItemsForReceipt(entity.getReceiptId());
            ReceiptDetailedVM detailedReceipt = new ReceiptDetailedVM(
                    email,
                    getBasicVmFromEntity(entity, items),
                    items
            );
            receipts.add(detailedReceipt);
        }
        return receipts;
    }

    private List<ReceiptItemVM> getItemsForReceipt(int receiptId) {
        List<ReceiptItemVM> items = new ArrayList<>();
        List<ReceiptItemEntity> entities = repo.getReceiptItemsForReceipt(receiptId);
        entities.forEach((entity) -> items.add(getItemVmFromEntity(entity)));
        return items;
    }

    private ReceiptItemVM getItemVmFromEntity(ReceiptItemEntity entity) {
        ProductDetailedVM product = ProductManager.getInstance().getProduct(entity.getProductId());
        return new ReceiptItemVM(
                entity.giveId(),
                entity.getReceiptId(),
                entity.getProductId(),
                product.getBasic().getName(),
                product.getBasic().getPictureUrl(),
                product.getBasic().getPrice(),
                entity.getAmount()
        );
    }

    private ReceiptBasicVM getBasicVmFromEntity(ReceiptEntity entity, List<ReceiptItemVM> items) {
        return new ReceiptBasicVM(
                entity.giveId(),
                entity.getReceiptNumber(),
                entity.isCreditCard(),
                entity.getPurchaseDate().toString(),
                getProductsSum(items),
                getPriceSum(items)
        );
    }

    private int getProductsSum(List<ReceiptItemVM> receiptItems) {
        return receiptItems.stream().mapToInt(ReceiptItemVM::getAmount).sum();
    }

    private double getPriceSum(List<ReceiptItemVM> receiptItems) {
        double price = 0;
        for (ReceiptItemVM receiptItem : receiptItems) {
            ProductDetailedVM product = ProductManager.getInstance().getProduct(receiptItem.getProductId());
            price += receiptItem.getAmount() * product.getBasic().getPrice();
        }
        return price;
    }

    public String createNewReceipt(CreateReceiptData createReceiptData, String email) {
        String receiptNumber = ReceiptNumberGenerator.getRandomReceiptNumber();
        int receiptId = insertReceipt(createReceiptData, email, receiptNumber);
        for (CreateReceiptItemData receiptItem : createReceiptData.getReceiptItems()) {
            insertReceiptItem(receiptItem, receiptId);
        }
        return receiptNumber;
    }

    private void insertReceiptItem(CreateReceiptItemData item, int receiptId) {
        ReceiptItemEntity receiptItemEntity = new ReceiptItemEntity();
        receiptItemEntity.setReceiptItemId(0);
        receiptItemEntity.setReceiptId(receiptId);
        receiptItemEntity.setAmount(item.getAmmount());
        receiptItemEntity.setProductId(item.getProductId());
        repo.insertReceiptItem(receiptItemEntity);
    }

    private int insertReceipt(CreateReceiptData createReceiptData, String email, String receiptNumber) {
        ReceiptEntity receiptEntity = new ReceiptEntity();
        receiptEntity.setReceiptId(0);
        receiptEntity.setCreditCard(createReceiptData.getMethod().equals(CreateReceiptData.METHOD_PAY_PAL));
        receiptEntity.setReceiptNumber(receiptNumber);
        receiptEntity.setPurchaseDate(new Timestamp(new Date().getTime()));
        receiptEntity.setUserAccountId(repo.getUserByUsername(email).getUserAccountId());
        return repo.insertReceipt(receiptEntity);
    }
}
