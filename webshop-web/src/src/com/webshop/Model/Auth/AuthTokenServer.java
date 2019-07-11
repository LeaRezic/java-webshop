package src.com.webshop.Model.Auth;

public class AuthTokenServer {

    private String email;
    private String tokenId;
    private String expireTime;
    private boolean isAdmin;

    private String userUuid;

    public AuthTokenServer(String email, String tokenId, String expireTime, boolean isAdmin, String userUuid) {
        this.email = email;
        this.tokenId = tokenId;
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

    public String getUserUuid() {
        return userUuid;
    }

    public void setUserUuid(String userUuid) {
        this.userUuid = userUuid;
    }
}
