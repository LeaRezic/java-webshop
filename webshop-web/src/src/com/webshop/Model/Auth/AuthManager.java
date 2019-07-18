package src.com.webshop.Model.Auth;

import src.com.webshop.Cache.AuthCache;
import src.com.webshop.Cache.AuthCacheFactory;
import src.com.webshop.DAL.Entities.RoleEntity;
import src.com.webshop.DAL.Entities.UserAccountEntity;
import src.com.webshop.DAL.Repository.DBRepository;
import src.com.webshop.DAL.Repository.Repository;
import src.com.webshop.Model.Auth.AuthToken.AuthTokenClient;
import src.com.webshop.Model.Auth.AuthToken.AuthTokenServer;
import src.com.webshop.Util.DateUtil;

import java.text.ParseException;
import java.util.UUID;

public class AuthManager {

    private static AuthManager authManager = null;
    private Repository repo;
    private AuthManager() {
        repo = DBRepository.getInstance();
    }
    public static AuthManager getInstance() {
        if (authManager == null) {
            return new AuthManager();
        }
        return authManager;
    }

    public boolean validateCredentials(String username, String password) {
        UserVM user = getUserByUsername(username);
        if (user == null) {
            return false;
        }
        return user.getPassword().equals(password);
    }

    public boolean usernameExists(String username) {
        return getUserByUsername(username) != null;
    }

    public AuthTokenClient getNewClientTokenAndCacheServerToken(String username, String password) {
        if (!validateCredentials(username, password)) {
            return null;
        }
        UserVM user = getUserByUsername(username);
        if (user == null) {
            return null;
        }
        String tokenId = UUID.randomUUID().toString();
        String expireDate = DateUtil.getNowWithMins(30);
        AuthTokenClient clientToken = getClientToken(user, tokenId, expireDate);
        AuthTokenServer serverToken = getServerToken(user, tokenId, expireDate);
        cacheServerToken(serverToken);
        return clientToken;
    }


    public AuthTokenServer getExistingServerToken(String tokenId) {
        AuthCache authCache = AuthCacheFactory.getAuthCache();
        AuthTokenServer token = null;
        if (authCache.checkIfPresent(tokenId)) {
            token = authCache.getAuthTokenServer(tokenId);
        }
        return token;
    }

    public boolean tokenValid(String tokenId) throws ParseException {
        AuthCache authCache = AuthCacheFactory.getAuthCache();
        if (authCache.checkIfPresent(tokenId)) {
            AuthTokenServer token = authCache.getAuthTokenServer(tokenId);
            return DateUtil.checkIfFuture(token.getExpireTime());
        }
        return false;
    }

    public boolean updateExpireDate(String tokenId) {
        AuthCache authCache = AuthCacheFactory.getAuthCache();
        if (authCache.checkIfPresent(tokenId)) {
            authCache.updateExpireDate(tokenId, DateUtil.getNowWithMins(30));
            return true;
        }
        return false;
    }

    private void cacheServerToken(AuthTokenServer serverToken) {
        AuthCache authCache = AuthCacheFactory.getAuthCache();
        authCache.storeAuthToken(serverToken);
    }

    private AuthTokenClient getClientToken(UserVM user, String tokenId, String expireDate) {
        return new AuthTokenClient(
                user.getUsername(),
                tokenId,
                expireDate,
                user.getRole().equals("administrator")
        );
    }

    private AuthTokenServer getServerToken(UserVM user, String tokenId, String expireDate) {
        return new AuthTokenServer(
                user.getUsername(),
                tokenId,
                expireDate,
                user.getRole().equals("administrator"),
                user.getUuid()
        );
    }

    private UserVM getUserByUsername(String username) {
        UserAccountEntity entity = repo.getUserByUsername(username);
        if (entity == null) {
            return null;
        }
        return getUserVmFromEntity(entity);
    }

    private UserVM getUserVmFromEntity(UserAccountEntity entity) {
        return new UserVM(
                entity.giveId(),
                entity.getUuid(),
                entity.getEmail(),
                getRoleName(entity.getRoleId()),
                entity.getPassword()
        );
    }

    private String getRoleName(int roleId) {
        RoleEntity role = repo.getRole(roleId);
        if (role == null) {
            return "UNKNOWN";
        }
        return role.getRoleName();
    }

}
