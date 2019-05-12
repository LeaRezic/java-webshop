package src.com.webshop.DAL.Repository;

import src.com.webshop.DAL.Entities.ProductCategoryEntity;

import java.util.ArrayList;

public class ConsoleTest {
    public static void main(String[] args) {
        DBRepository dbRepository = new DBRepository();
        ArrayList<ProductCategoryEntity> list = (ArrayList<ProductCategoryEntity>) dbRepository.getProductCategories();
        System.out.println(list == null);
        list.forEach((c) -> System.out.println(c.getName()));
    }
}
