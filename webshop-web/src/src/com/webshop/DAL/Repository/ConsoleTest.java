package src.com.webshop.DAL.Repository;

import redis.clients.jedis.Jedis;
import src.com.webshop.Model.Category.CategoryManager;

import java.util.UUID;


public class ConsoleTest {
    public static void main(String[] args) {
        DBRepository dbRepository = new DBRepository();
        dbRepository.getProducts().forEach((p) -> System.out.println(p.getName()));

        System.out.println("-------------------------");
        CategoryManager.getAllCategories().forEach((c) -> {
            System.out.println(c.getName() + " " + c.getSubcategories().size());
            c.getSubcategories().forEach((sc) -> System.out.println("  " + sc.getName()));
        });

        Jedis jedis = new Jedis("localhost");
        System.out.println("Connection to server sucessfully");
        //check whether server is running or not
        System.out.println("Server is running: "+ jedis.ping());

        for (int i = 0; i < 26; i++) {
            System.out.println(UUID.randomUUID());
        }
    }
}
