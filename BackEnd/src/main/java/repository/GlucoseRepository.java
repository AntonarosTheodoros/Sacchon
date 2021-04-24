package repository;

import model.Glucose;

import javax.persistence.EntityManager;

public class GlucoseRepository extends Repository<Glucose, Long>{
    public GlucoseRepository(EntityManager entityManager) {
        super(entityManager);
    }

    @Override
    public Class<Glucose> getEntityClass() {
        return Glucose.class;
    }

    @Override
    public String getClassName() {
        return Glucose.class.getName();
    }
}
