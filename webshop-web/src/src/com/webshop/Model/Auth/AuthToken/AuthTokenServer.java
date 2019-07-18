package src.com.webshop.Model.Auth.AuthToken;

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

    public String getTokenId() {
        return tokenId;
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

    public String getUserUuid() {
        return userUuid;
    }

}
