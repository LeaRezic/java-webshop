package src.com.webshop.Model.Auth;

public class AuthTokenServer {

    private String email;
    private String idToken;
    private String expireTime;
    private boolean isAdmin;

    private String userUuid;

    public AuthTokenServer(String email, String idToken, String expireTime, boolean isAdmin, String userUuid) {
        this.email = email;
        this.idToken = idToken;
        this.expireTime = expireTime;
        this.isAdmin = isAdmin;
        this.userUuid = userUuid;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getIdToken() {
        return idToken;
    }

    public void setIdToken(String idToken) {
        this.idToken = idToken;
    }

    public String getExpireTime() {
        return expireTime;
    }

    public void setExpireTime(String expireTime) {
        this.expireTime = expireTime;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public String getUserUuid() {
        return userUuid;
    }

    public void setUserUuid(String userUuid) {
        this.userUuid = userUuid;
    }
}
