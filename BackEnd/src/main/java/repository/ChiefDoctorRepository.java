package repository;

import model.ChiefDoctor;
import model.Doctor;

import javax.persistence.EntityManager;

public class ChiefDoctorRepository extends Repository<ChiefDoctor, Long>{
    private EntityManager entityManager;

    public ChiefDoctorRepository(EntityManager entityManager) {

        super(entityManager);
        this.entityManager= entityManager;
    }

    @Override
    public Class<ChiefDoctor> getEntityClass() {
        return ChiefDoctor.class;
    }

    @Override
    public String getClassName() {
        return ChiefDoctor.class.getName();
    }

    public ChiefDoctor getByUsername(String username){
        try {
            return entityManager.createQuery("from ChiefDoctor p where p.username='" + username + "'", ChiefDoctor.class).getSingleResult();
        }catch(Exception e){
            return null;
        }
    }

    public ChiefDoctor getByPassword(String password){
        try {
            return entityManager.createQuery("from ChiefDoctor p where p.password='" + password + "'", ChiefDoctor.class).getSingleResult();
        }catch(Exception e){
            return null;
        }
    }
}
