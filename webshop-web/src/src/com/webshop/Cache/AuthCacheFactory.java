package src.com.webshop.Cache;

public class AuthCacheFactory {

    public static final AuthCache getAuthCache() {
        return RedisAuthCache.getInstance();
    }
}
