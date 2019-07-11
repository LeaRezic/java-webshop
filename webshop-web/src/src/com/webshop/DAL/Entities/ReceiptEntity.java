package src.com.webshop.DAL.Entities;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "receipt", schema = "public", catalog = "webshop")
public class ReceiptEntity implements EntityBase {

    private int receiptId;
    private int userDetailsId;
    private String receiptNumber;
    private boolean creditCard;
    private Timestamp purchaseDate;

    @Id
    @Column(name = "receipt_id", nullable = false)
    public int getReceiptId() {
        return receiptId;
    }

    public void setReceiptId(int receiptId) {
        this.receiptId = receiptId;
    }

    @Basic
    @Column(name = "user_details_id", nullable = false)
    public int getUserDetailsId() {
        return userDetailsId;
    }

    public void setUserDetailsId(int userDetailsId) {
        this.userDetailsId = userDetailsId;
    }

    @Basic
    @Column(name = "receipt_number", nullable = false, length = 25)
    public String getReceiptNumber() {
        return receiptNumber;
    }

    public void setReceiptNumber(String receiptNumber) {
        this.receiptNumber = receiptNumber;
    }

    @Basic
    @Column(name = "credit_card", nullable = false)
    public boolean isCreditCard() {
        return creditCard;
    }

    public void setCreditCard(boolean creditCard) {
        this.creditCard = creditCard;
    }

    @Basic
    @Column(name = "purchase_date", nullable = false)
    public Timestamp getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(Timestamp purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ReceiptEntity that = (ReceiptEntity) o;
        return receiptId == that.receiptId &&
                userDetailsId == that.userDetailsId &&
                creditCard == that.creditCard &&
                Objects.equals(receiptNumber, that.receiptNumber) &&
                Objects.equals(purchaseDate, that.purchaseDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(receiptId, userDetailsId, receiptNumber, creditCard, purchaseDate);
    }

    @Override
    public int giveId() {
        return receiptId;
    }
}
