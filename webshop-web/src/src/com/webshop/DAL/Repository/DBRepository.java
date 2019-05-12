package src.com.webshop.DAL.Repository;

import src.com.webshop.DAL.Entities.EntityBase;
import src.com.webshop.DAL.Entities.ProductCategoryEntity;
import src.com.webshop.DAL.Entities.ProductEntity;
import src.com.webshop.DAL.EntityManagerFactoryUtil;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import java.util.List;

public class DBRepository implements Repository {

    private EntityManagerFactory emFactory;

    public DBRepository() {
        this.emFactory = EntityManagerFactoryUtil.getEmFactory();
    }

    private List<?> getAllEntitiesOfType(String className) {
        EntityManager em = null;
        List<?> entities = null;
        try {
            em = emFactory.createEntityManager();
            System.out.println("From DB Repo, entity manager...");
            System.out.println(em == null);
            em.getTransaction().begin();
            entities = em.createQuery("FROM " + className).getResultList();
            em.getTransaction().commit();
            em.close();
            return entities;
        } catch (Exception e) {
            if (em != null) {
                em.close();
            }
        }
        return entities;
    }

    private EntityBase getEntityOfTypeById(String className, int id) {
        EntityManager em = null;
        EntityBase entity = null;
        try {
            StringBuilder sb = new StringBuilder();
            sb.append("FROM ").append(className).append(" WHERE id = ").append(id);
            em = emFactory.createEntityManager();
            em.getTransaction().begin();
            entity = (EntityBase) em.createQuery(sb.toString()).getResultList().get(0);
            em.getTransaction().commit();
            em.close();
        } catch (Exception e) {
            if (em != null) {
                em.close();
            }
        }
        return entity;
    }

    @Override
    public List<ProductEntity> getProducts() {
        return null;
    }

    @Override
    public List<ProductCategoryEntity> getProductCategories() {
        return (List<ProductCategoryEntity>) getAllEntitiesOfType(ProductCategoryEntity.class.getSimpleName());
    }
}
