package src.com.webshop.DAL.Entities;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "login_log", schema = "public", catalog = "webshop")
public class LoginLogEntity {
    private int loginLogId;
    private String ipAddress;
    private Timestamp loginDate;
    private boolean register;

    @Id
    @Column(name = "login_log_id", nullable = false)
    public int getLoginLogId() {
        return loginLogId;
    }

    public void setLoginLogId(int loginLogId) {
        this.loginLogId = loginLogId;
    }

    @Basic
    @Column(name = "ip_address", nullable = false, length = 15)
    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    @Basic
    @Column(name = "login_date", nullable = false)
    public Timestamp getLoginDate() {
        return loginDate;
    }

    public void setLoginDate(Timestamp loginDate) {
        this.loginDate = loginDate;
    }

    @Basic
    @Column(name = "register", nullable = false)
    public boolean isRegister() {
        return register;
    }

    public void setRegister(boolean register) {
        this.register = register;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        LoginLogEntity that = (LoginLogEntity) o;
        return loginLogId == that.loginLogId &&
                register == that.register &&
                Objects.equals(ipAddress, that.ipAddress) &&
                Objects.equals(loginDate, that.loginDate);
    }

    @Override
    public int hashCode() {
        return Objects.hash(loginLogId, ipAddress, loginDate, register);
    }
}
