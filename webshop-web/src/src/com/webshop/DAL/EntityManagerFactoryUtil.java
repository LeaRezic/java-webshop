package src.com.webshop.DAL;

import org.hibernate.jpa.HibernatePersistenceProvider;

import javax.persistence.EntityManagerFactory;
import javax.persistence.spi.PersistenceProvider;
import java.util.HashMap;

public class EntityManagerFactoryUtil {

    private static EntityManagerFactory factory = null;

    private static void initFactory() {
        PersistenceProvider persistenceProvider = new HibernatePersistenceProvider();
        factory = persistenceProvider
                .createEntityManagerFactory("persistenceUnit", new HashMap());
    }

    public static EntityManagerFactory getEmFactory() {
        if (factory == null) {
            initFactory();
        }
        return factory;
    }

}
