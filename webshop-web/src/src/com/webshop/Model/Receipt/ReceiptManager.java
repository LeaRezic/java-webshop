package src.com.webshop.Model.Receipt;

import src.com.webshop.DAL.Entities.ReceiptEntity;
import src.com.webshop.DAL.Entities.ReceiptItemEntity;
import src.com.webshop.DAL.Repository.Repository;
import src.com.webshop.DAL.Repository.RepositoryFactory;
import src.com.webshop.Model.Product.ProductDetailedVM;
import src.com.webshop.Model.Product.ProductManager;

import java.util.ArrayList;
import java.util.List;

public class ReceiptManager {

    private static Repository repo = RepositoryFactory.getRepo();

    public static List<ReceiptBasicVM> getReceiptsForUuid(String userUuid) {
        List<ReceiptBasicVM> returnList = new ArrayList<>();
        List<ReceiptEntity> entities = repo.getReceiptsForCustomer(userUuid);
        entities.forEach((entity) -> returnList.add(getVmFromEntity(entity)));
        return returnList;
    }

    private static ReceiptBasicVM getVmFromEntity(ReceiptEntity entity) {
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
