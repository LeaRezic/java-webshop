package src.com.webshop.DAL.Repository;

import src.com.webshop.Models.Category.CategoryManager;


public class ConsoleTest {
    public static void main(String[] args) {
        DBRepository dbRepository = new DBRepository();
        dbRepository.getProducts().forEach((p) -> System.out.println(p.getName()));

        System.out.println("-------------------------");
        CategoryManager.getAllCategories().forEach((c) -> {
            System.out.println(c.getName() + " " + c.getSubcategories().size());
            c.getSubcategories().forEach((sc) -> System.out.println("  " + sc.getName()));
        });
    }
}
