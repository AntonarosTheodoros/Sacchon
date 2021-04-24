package repository;

import model.Consultation;

import javax.persistence.EntityManager;

public class ConsultationRepository extends Repository<Consultation, Long>{
    public ConsultationRepository(EntityManager entityManager) {
        super(entityManager);
    }

    @Override
    public Class<Consultation> getEntityClass() {
        return Consultation.class;
    }

    @Override
    public String getClassName() {
        return Consultation.class.getName();
    }
}
