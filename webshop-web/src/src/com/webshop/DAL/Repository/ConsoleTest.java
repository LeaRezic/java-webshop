package src.com.webshop.DAL.Repository;

import src.com.webshop.DAL.Entities.ProductCategoryEntity;

import java.util.ArrayList;

public class ConsoleTest {
    public static void main(String[] args) {
        DBRepository dbRepository = new DBRepository();
        dbRepository.getProducts().forEach((p) -> System.out.println(p));
    }
}
