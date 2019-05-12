package src.com.webshop.DAL.Entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "product_subcategory", schema = "public", catalog = "webshop")
public class ProductSubcategoryEntity implements EntityBase {
    private int productSubcategoryId;
    private int productCategoryId;
    private String name;

    @Id
    @Column(name = "product_subcategory_id", nullable = false)
    public int getProductSubcategoryId() {
        return productSubcategoryId;
    }

    public void setProductSubcategoryId(int productSubcategoryId) {
        this.productSubcategoryId = productSubcategoryId;
    }

    @Basic
    @Column(name = "product_category_id", nullable = false)
    public int getProductCategoryId() {
        return productCategoryId;
    }

    public void setProductCategoryId(int productCategoryId) {
        this.productCategoryId = productCategoryId;
    }

    @Basic
    @Column(name = "name", nullable = false, length = 255)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductSubcategoryEntity that = (ProductSubcategoryEntity) o;
        return productSubcategoryId == that.productSubcategoryId &&
                productCategoryId == that.productCategoryId &&
                Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productSubcategoryId, productCategoryId, name);
    }

    @Override
    public int giveId() {
        return productSubcategoryId;
    }
}
