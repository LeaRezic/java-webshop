package src.com.webshop.Cache;

import redis.clients.jedis.Jedis;
import src.com.webshop.Model.Auth.AuthToken.AuthTokenServer;
import src.com.webshop.Util.DateUtil;
import src.com.webshop.Util.JsonUtil;

import java.text.ParseException;

public class RedisAuthCache implements AuthCache {

    private static RedisAuthCache authCache = null;
    private static Jedis jedis;

    private RedisAuthCache() {
        jedis = new Jedis("localhost");
    }

    public static AuthCache getInstance() {
        if (authCache == null) {
            return new RedisAuthCache();
        }
        return authCache;
    }

    @Override
    public void storeAuthToken(AuthTokenServer token) {
        if (jedis.exists(token.getTokenId())) {
            jedis.del(token.getTokenId());
        }
        jedis.set(token.getTokenId(), JsonUtil.getJsonString(token));
        try {
            jedis.expire(token.getTokenId(), (int) DateUtil.getSecondsDiff(token.getExpireTime()));
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void updateExpireDate(String uuid, String expireTime) {
        String json = jedis.get(uuid);
        AuthTokenServer token = (AuthTokenServer) JsonUtil.getObjFromJson(json, AuthTokenServer.class);
        token.setExpireTime(expireTime);
        storeAuthToken(token);
    }

    @Override
    public AuthTokenServer getAuthTokenServer(String tokenId) {
        String json = jedis.get(tokenId);
        return (AuthTokenServer) JsonUtil.getObjFromJson(json, AuthTokenServer.class);
    }

    @Override
    public boolean checkIfPresent(String tokenId) {
        return jedis.exists(tokenId);
    }
}
