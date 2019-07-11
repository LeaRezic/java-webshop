package src.com.webshop.Model.Auth;

public class AuthTokenClient {

    private String email;
    private String tokenId;
    private String expireTime;
    private boolean isAdmin;

    public AuthTokenClient(String email, String tokenId, String expireTime, boolean isAdmin) {
        this.email = email;
        this.tokenId = tokenId;
        this.expireTime = expireTime;
        this.isAdmin = isAdmin;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTokenId() {
        return tokenId;
    }

    public void setTokenId(String tokenId) {
        this.tokenId = tokenId;
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
