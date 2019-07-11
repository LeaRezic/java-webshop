package src.com.webshop.Model.Auth;

import src.com.webshop.Cache.AuthCache;
import src.com.webshop.Cache.AuthCacheFactory;
import src.com.webshop.Util.DateUtil;

import java.text.ParseException;
import java.util.Date;
import java.util.UUID;

public class AuthTokenManager {

    /*
    * create new token for existing user
    * create new user, give it a token
    * check if token exists
    * get existing token
    * */

    public static boolean validateCredentials(String username, String password) {
        return UserManager.validatePassword(username, password);
    }

    public static AuthTokenClient getNewClientToken(String username, String password) {
        if (!validateCredentials(username, password)) {
            return null;
        }
        String tokenId = UUID.randomUUID().toString();
        String expireDate = DateUtil.getNowWithMins(30);
        UserVM user = UserManager.getUserByUsername(username);
        AuthTokenClient clientToken = getClientToken(user, tokenId, expireDate);
        AuthTokenServer serverToken = getServerToken(user, tokenId, expireDate);
        cacheServerToken(serverToken);
        return clientToken;
    }

    public static boolean usernameExists(String username) {
        return UserManager.getUserByUsername(username) != null;
    }

    private static AuthTokenClient getExistingClientToken(String tokenId) {
        AuthCache authCache = AuthCacheFactory.getAuthCache();
        AuthTokenServer tokenServer = authCache.getAuthTokenServer(tokenId);
        authCache.updateExpireDate(tokenId, DateUtil.getNowWithMins(30));
        return new AuthTokenClient(
                tokenServer.getEmail(),
                tokenServer.getIdToken(),
                tokenServer.getExpireTime(),
                tokenServer.isAdmin()
        );
    }

    public static boolean tokenPresent(String tokenId) {
        AuthCache authCache = AuthCacheFactory.getAuthCache();
        return authCache.checkIfPresent(tokenId);
    }

    public static AuthTokenServer getExistingServerToken(String tokenId) {
        AuthCache authCache = AuthCacheFactory.getAuthCache();
        AuthTokenServer token = null;
        if (authCache.checkIfPresent(tokenId)) {
            token = authCache.getAuthTokenServer(tokenId);
        }
        return token;
    }

    public static boolean tokenValid(String tokenId) throws ParseException {
        AuthCache authCache = AuthCacheFactory.getAuthCache();
        if (authCache.checkIfPresent(tokenId)) {
            AuthTokenServer token = authCache.getAuthTokenServer(tokenId);
            return DateUtil.checkIfFuture(token.getExpireTime());
        }
        return false;
    }

    public static boolean updateExpireDate(String tokenId) {
        AuthCache authCache = AuthCacheFactory.getAuthCache();
        if (authCache.checkIfPresent(tokenId)) {
            authCache.updateExpireDate(tokenId, DateUtil.getNowWithMins(30));
        }
        return false;
    }

    private static void cacheServerToken(AuthTokenServer serverToken) {
        AuthCache authCache = AuthCacheFactory.getAuthCache();
        authCache.storeAuthToken(serverToken);
    }

    public static AuthTokenClient getClientToken(UserVM user, String tokenId, String expireDate) {
        return new AuthTokenClient(
                user.getUsername(),
                tokenId,
                expireDate,
                user.getRole().equals("admin")
        );
    }

    public static AuthTokenServer getServerToken(UserVM user, String tokenId, String expireDate) {
        return new AuthTokenServer(
                user.getUsername(),
                tokenId,
                expireDate,
                user.getRole().equals("admin"),
                user.getUuid()
        );
    }

}
