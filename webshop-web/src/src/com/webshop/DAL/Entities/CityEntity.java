package src.com.webshop.DAL.Entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "city", schema = "public", catalog = "webshop")
public class CityEntity implements EntityBase {
    private int cityId;
    private String name;
    private int countryId;

    @Id
    @Column(name = "city_id", nullable = false)
    public int getCityId() {
        return cityId;
    }

    public void setCityId(int cityId) {
        this.cityId = cityId;
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
    @Column(name = "country_id", nullable = false)
    public int getCountryId() {
        return countryId;
    }

    public void setCountryId(int countryId) {
        this.countryId = countryId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CityEntity that = (CityEntity) o;
        return cityId == that.cityId &&
                countryId == that.countryId &&
                Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(cityId, name, countryId);
    }

    @Override
    public int giveId() {
        return cityId;
    }
}
