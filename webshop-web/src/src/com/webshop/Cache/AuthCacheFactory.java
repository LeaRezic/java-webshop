package src.com.webshop.Cache;

public class AuthCacheFactory {

    public static AuthCache getAuthCache() {
        return RedisAuthCache.getInstance();
    }
}
