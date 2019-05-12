package src.com.webshop.DAL.Entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "product_category", schema = "public", catalog = "webshop")
public class ProductCategoryEntity implements EntityBase {
    private int productCategoryId;
    private String name;

    @Id
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
        ProductCategoryEntity that = (ProductCategoryEntity) o;
        return productCategoryId == that.productCategoryId &&
                Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productCategoryId, name);
    }

    @Override
    public int giveId() {
        return productCategoryId;
    }
}
