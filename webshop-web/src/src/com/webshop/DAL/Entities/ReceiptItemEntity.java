package src.com.webshop.DAL.Entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "receipt_item", schema = "public", catalog = "webshop")
public class ReceiptItemEntity implements EntityBase {
    private int receiptItemId;
    private int receiptId;
    private int productId;
    private int amount;

    @Id
    @Column(name = "receipt_item_id", nullable = false)
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    public int getReceiptItemId() {
        return receiptItemId;
    }

    public void setReceiptItemId(int receiptItemId) {
        this.receiptItemId = receiptItemId;
    }

    @Basic
    @Column(name = "receipt_id", nullable = false)
    public int getReceiptId() {
        return receiptId;
    }

    public void setReceiptId(int receiptId) {
        this.receiptId = receiptId;
    }

    @Basic
    @Column(name = "product_id", nullable = false)
    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    @Basic
    @Column(name = "amount", nullable = false)
    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ReceiptItemEntity that = (ReceiptItemEntity) o;
        return receiptItemId == that.receiptItemId &&
                receiptId == that.receiptId &&
                productId == that.productId &&
                amount == that.amount;
    }

    @Override
    public int hashCode() {
        return Objects.hash(receiptItemId, receiptId, productId, amount);
    }

    @Override
    public int giveId() {
        return receiptItemId;
    }
}
