package src.com.webshop.Cache;

import src.com.webshop.Model.Auth.AuthToken.AuthTokenServer;

public interface AuthCache {

    void storeAuthToken(AuthTokenServer token);
    void updateExpireDate(String uuid, String expireTime);
    AuthTokenServer getAuthTokenServer(String tokenId);

    boolean checkIfPresent(String tokenId);
}
