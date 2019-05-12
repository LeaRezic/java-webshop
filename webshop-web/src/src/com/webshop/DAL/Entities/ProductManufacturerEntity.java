package src.com.webshop.DAL.Entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "product_manufacturer", schema = "public", catalog = "webshop")
public class ProductManufacturerEntity implements EntityBase {
    private int productManufacturerId;
    private String name;

    @Id
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductManufacturerEntity that = (ProductManufacturerEntity) o;
        return productManufacturerId == that.productManufacturerId &&
                Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productManufacturerId, name);
    }

    @Override
    public int giveId() {
        return productManufacturerId;
    }
}
