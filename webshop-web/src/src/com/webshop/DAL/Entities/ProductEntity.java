package src.com.webshop.DAL.Entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "product", schema = "public", catalog = "webshop")
public class ProductEntity implements EntityBase {
    private int productId;
    private int productSubcategoryId;
    private int productManufacturerId;
    private String name;
    private String description;
    private String pictureUrl;
    private String externalUrl;
    private double price;

    @Id
    @Column(name = "product_id", nullable = false)
    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    @Basic
    @Column(name = "product_subcategory_id", nullable = false)
    public int getProductSubcategoryId() {
        return productSubcategoryId;
    }

    public void setProductSubcategoryId(int productSubcategoryId) {
        this.productSubcategoryId = productSubcategoryId;
    }

    @Basic
    @Column(name = "product_manufacturer_id", nullable = false)
    public int getProductManufacturerId() {
        return productManufacturerId;
    }

    public void setProductManufacturerId(int productManufacturerId) {
        this.productManufacturerId = productManufacturerId;
    }

    @Basic
    @Column(name = "name", nullable = false, length = 255)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "description", nullable = true, length = -1)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Basic
    @Column(name = "picture_url", nullable = true, length = 255)
    public String getPictureUrl() {
        return pictureUrl;
    }

    public void setPictureUrl(String pictureUrl) {
        this.pictureUrl = pictureUrl;
    }

    @Basic
    @Column(name = "external_url", nullable = true, length = 255)
    public String getExternalUrl() {
        return externalUrl;
    }

    public void setExternalUrl(String externalUrl) {
        this.externalUrl = externalUrl;
    }

    @Basic
    @Column(name = "price", nullable = false)
    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductEntity that = (ProductEntity) o;
        return productId == that.productId &&
                productSubcategoryId == that.productSubcategoryId &&
                productManufacturerId == that.productManufacturerId &&
                Objects.equals(name, that.name) &&
                Objects.equals(description, that.description) &&
                Objects.equals(pictureUrl, that.pictureUrl) &&
                Objects.equals(externalUrl, that.externalUrl) &&
                Objects.equals(price, that.price);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId, productSubcategoryId, productManufacturerId, name, description, pictureUrl, externalUrl, price);
    }

    @Override
    public int giveId() {
        return productId;
    }

    @Override
    public String toString() {
        return String.format("%s [%s]", name, price);
    }
}
