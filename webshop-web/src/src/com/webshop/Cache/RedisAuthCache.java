package src.com.webshop.Cache;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;
import src.com.webshop.Model.Auth.AuthToken.AuthTokenServer;
import src.com.webshop.Util.DateUtil;
import src.com.webshop.Util.JsonUtil;

import java.text.ParseException;

public class RedisAuthCache implements AuthCache {

    private static RedisAuthCache authCache = null;
    private static JedisPool jedisPool;

    private RedisAuthCache() {
        jedisPool = new JedisPool(new JedisPoolConfig(), "localhost");
    }

    public static AuthCache getInstance() {
        if (authCache == null) {
            return new RedisAuthCache();
        }
        return authCache;
    }

    @Override
    public void storeAuthToken(AuthTokenServer token) {
        try (Jedis jedis = jedisPool.getResource()) {
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
    }

    @Override
    public void updateExpireDate(String uuid, String expireTime) {
        try (Jedis jedis = jedisPool.getResource()) {
            String json = jedis.get(uuid);
            AuthTokenServer token = (AuthTokenServer) JsonUtil.getObjFromJson(json, AuthTokenServer.class);
            token.setExpireTime(expireTime);
            storeAuthToken(token);
        }
    }

    @Override
    public AuthTokenServer getAuthTokenServer(String tokenId) {
        try (Jedis jedis = jedisPool.getResource()) {
            String json = jedis.get(tokenId);
            return (AuthTokenServer) JsonUtil.getObjFromJson(json, AuthTokenServer.class);
        }
    }

    @Override
    public boolean checkIfPresent(String tokenId) {
        try (Jedis jedis = jedisPool.getResource()) {
            return jedis.exists(tokenId);
        }
    }
}
