package repository;

import com.microsoft.sqlserver.jdbc.SQLServerException;
import org.hibernate.exception.ConstraintViolationException;

import javax.persistence.EntityManager;
import java.util.List;

public abstract class Repository<T,K> {
    private EntityManager entityManager;

    public Repository(EntityManager entityManager){
        this.entityManager = entityManager;
    }

    //Create , insert
    public T save(T t){
        try {
            entityManager.getTransaction().begin();
            entityManager.persist(t);
            entityManager.getTransaction().commit();
        } catch (ConstraintViolationException e){
            System.out.println("Already registered!");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public abstract Class<T> getEntityClass();
    public abstract String getClassName();
    // Read select
    public T read(K id){
        try {
            T t = entityManager.find(getEntityClass(), id);
            return t;
        }catch(Exception e){
            return null;
        }
    }

    public List<T> findAll(){
        try {
            return entityManager.createQuery("from "+getClassName()).getResultList();
        }catch(Exception e){
            return null;
        }
    }


    // Update
    public T update( T t) {
        try {
            entityManager.getTransaction().begin();
            entityManager.merge(t);
            entityManager.getTransaction().commit();
            return t;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    //Verify



    // Delete
    public boolean delete(K id) {
        T t = read(id);
        if (t == null) {
            return false;
        }
        try {
            entityManager.getTransaction().begin();
            entityManager.remove(t);
            entityManager.getTransaction().commit();
            return true;
        } catch (Exception e) {
            return false;
        }
    }


}