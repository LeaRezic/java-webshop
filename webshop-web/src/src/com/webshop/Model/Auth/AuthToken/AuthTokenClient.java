package src.com.webshop.Model.Auth.AuthToken;

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

}
