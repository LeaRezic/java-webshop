package src.com.webshop.Model.Auth;

public class AuthTokenClient {

    private String email;
    private String idToken;
    private String expireTime;
    private boolean isAdmin;

    public AuthTokenClient(String email, String idToken, String expireTime, boolean isAdmin) {
        this.email = email;
        this.idToken = idToken;
        this.expireTime = expireTime;
        this.isAdmin = isAdmin;
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
}
