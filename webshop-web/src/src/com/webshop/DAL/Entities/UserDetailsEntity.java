package src.com.webshop.DAL.Entities;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "user_details", schema = "public", catalog = "webshop")
public class UserDetailsEntity implements EntityBase {
    private int userDetailsId;
    private int userAccountId;
    private String firstName;
    private String lastName;
    private boolean female;
    private Integer cityId;
    private String fullStreet;
    private String phone;

    @Id
    @Column(name = "user_details_id", nullable = false)
    public int getUserDetailsId() {
        return userDetailsId;
    }

    public void setUserDetailsId(int userDetailsId) {
        this.userDetailsId = userDetailsId;
    }

    @Basic
    @Column(name = "user_account_id", nullable = false)
    public int getUserAccountId() {
        return userAccountId;
    }

    public void setUserAccountId(int userAccountId) {
        this.userAccountId = userAccountId;
    }

    @Basic
    @Column(name = "first_name", nullable = false, length = 255)
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @Basic
    @Column(name = "last_name", nullable = false, length = 255)
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @Basic
    @Column(name = "female", nullable = false)
    public boolean isFemale() {
        return female;
    }

    public void setFemale(boolean female) {
        this.female = female;
    }

    @Basic
    @Column(name = "city_id", nullable = true)
    public Integer getCityId() {
        return cityId;
    }

    public void setCityId(Integer cityId) {
        this.cityId = cityId;
    }

    @Basic
    @Column(name = "full_street", nullable = true, length = -1)
    public String getFullStreet() {
        return fullStreet;
    }

    public void setFullStreet(String fullStreet) {
        this.fullStreet = fullStreet;
    }

    @Basic
    @Column(name = "phone", nullable = true, length = 25)
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserDetailsEntity that = (UserDetailsEntity) o;
        return userDetailsId == that.userDetailsId &&
                userAccountId == that.userAccountId &&
                female == that.female &&
                Objects.equals(firstName, that.firstName) &&
                Objects.equals(lastName, that.lastName) &&
                Objects.equals(cityId, that.cityId) &&
                Objects.equals(fullStreet, that.fullStreet) &&
                Objects.equals(phone, that.phone);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userDetailsId, userAccountId, firstName, lastName, female, cityId, fullStreet, phone);
    }

    @Override
    public int giveId() {
        return userDetailsId;
    }
}
