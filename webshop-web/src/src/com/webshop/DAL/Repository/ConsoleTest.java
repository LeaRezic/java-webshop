package src.com.webshop.DAL.Repository;

import src.com.webshop.Model.Auth.AuthToken.AuthTokenServer;
import src.com.webshop.Model.UserData.UserManager;
import src.com.webshop.Model.UserData.UserVM;
import src.com.webshop.Model.Shop.Category.CategoryManager;
import src.com.webshop.Util.DateUtil;
import src.com.webshop.Util.DummyLogger.LoggerUtil;

import java.util.UUID;

public class ConsoleTest {
    public static void main(String[] args) {
        Repository dbRepository = RepositoryFactory.getRepo();
        dbRepository.getProducts().forEach((p) -> System.out.println(p.getName()));

        System.out.println("-------------------------");
        CategoryManager.getAllCategories().forEach((c) -> {
            System.out.println(c.getName() + " " + c.getSubcategories().size());
            c.getSubcategories().forEach((sc) -> System.out.println("  " + sc.getName()));
        });

        AuthTokenServer token = new AuthTokenServer(
                "miki@mail.com",
                UUID.randomUUID().toString(),
                DateUtil.getNowWithMins(30),
                false,
                UUID.randomUUID().toString()
        );
        /*
        * AuthCache authCache = AuthCacheFactory.getAuthCache();
        authCache.storeAuthToken(token);
        AuthTokenServer retreivedToken = authCache.getAuthTokenServer(token.getIdToken());
        System.out.println(retreivedToken.getEmail());
        System.out.println(retreivedToken.getEmail());
        System.out.println(retreivedToken.getIdToken());*/

        // 728d3fe0-330d-4011-bea5-83697c0b7a28
        /*
        AuthCache authCache = AuthCacheFactory.getAuthCache();
        AuthTokenServer retreivedToken = authCache.getAuthTokenServer("728d3fe0-330d-4011-bea5-83697c0b7a28");
        System.out.println(retreivedToken.getEmail());
        System.out.println(retreivedToken.getIdToken());
        */

        UserVM user = UserManager.getUserByUsername("plain@user.com");
        System.out.println(user.getUsername());
        System.out.println(user.getUuid());

        LoggerUtil.log("[KOJI VRAG]");
    }
}
