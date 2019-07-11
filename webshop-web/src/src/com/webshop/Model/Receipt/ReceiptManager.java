package src.com.webshop.Model.Receipt;

import src.com.webshop.DAL.Entities.ReceiptEntity;
import src.com.webshop.DAL.Entities.ReceiptItemEntity;
import src.com.webshop.DAL.Entities.UserAccountEntity;
import src.com.webshop.DAL.Repository.Repository;
import src.com.webshop.DAL.Repository.RepositoryFactory;
import src.com.webshop.Model.Product.ProductDetailedVM;
import src.com.webshop.Model.Product.ProductManager;

import java.util.ArrayList;
import java.util.List;

public class ReceiptManager {

    private static Repository repo = RepositoryFactory.getRepo();

    public static List<ReceiptDetailedVM> getReceiptsDetailed(String uuid) {
        UserAccountEntity user = repo.getUserAccountByUUID(uuid);
        String email = user.getEmail();
        List<ReceiptDetailedVM> receipts = new ArrayList<>();
        List<ReceiptEntity> entities = repo.getReceiptsForCustomer(uuid);
        for (ReceiptEntity entity : entities) {
            ReceiptDetailedVM detailedReceipt = new ReceiptDetailedVM(
                    email,
                    getBasicVmFromEntity(entity),
                    getItemsFromEntity(entity.getReceiptId())
            );
            receipts.add(detailedReceipt);
        }
        return receipts;
    }

    private static List<ReceiptItemVM> getItemsFromEntity(int receiptId) {
        List<ReceiptItemVM> items = new ArrayList<>();
        List<ReceiptItemEntity> entities = repo.getReceiptItemsForReceipt(receiptId);
        entities.forEach((entity) -> items.add(getItemVmFromEntity(entity)));
        return items;
    }

    private static ReceiptItemVM getItemVmFromEntity(ReceiptItemEntity entity) {
        ProductDetailedVM product = ProductManager.getProduct(entity.getProductId());
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

    public static List<ReceiptBasicVM> getReceiptsForUuid(String userUuid) {
        List<ReceiptBasicVM> returnList = new ArrayList<>();
        List<ReceiptEntity> entities = repo.getReceiptsForCustomer(userUuid);
        entities.forEach((entity) -> returnList.add(getBasicVmFromEntity(entity)));
        return returnList;
    }

    private static ReceiptBasicVM getBasicVmFromEntity(ReceiptEntity entity) {
        List<ReceiptItemEntity> receiptItems = repo.getReceiptItemsForReceipt(entity.giveId());
        return new ReceiptBasicVM(
                entity.giveId(),
                entity.getReceiptNumber(),
                entity.isCreditCard(),
                entity.getPurchaseDate().toString(),
                getProductsSum(receiptItems),
                getPriceSum(receiptItems)
        );
    }

    private static int getProductsSum(List<ReceiptItemEntity> receiptItems) {
        return receiptItems.stream().mapToInt(ReceiptItemEntity::getAmount).sum();
    }

    private static double getPriceSum(List<ReceiptItemEntity> receiptItems) {
        double price = 0;
        for (ReceiptItemEntity receiptItem : receiptItems) {
            ProductDetailedVM product = ProductManager.getProduct(receiptItem.getProductId());
            price += receiptItem.getAmount() * product.getBasic().getPrice();
        }
        return price;
    }

}
