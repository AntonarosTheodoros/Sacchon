package repository;

import model.Carb;
import model.Consultation;
import model.Glucose;
import model.Patient;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;

public class PatientRepository extends Repository<Patient, Long>{
    private EntityManager entityManager;

    public PatientRepository(EntityManager entityManager) {

        super(entityManager);
        this.entityManager= entityManager;
    }

    @Override
    public Class<Patient> getEntityClass() {
        return Patient.class;
    }

    @Override
    public String getClassName() {
        return Patient.class.getName();
    }

    public Patient getByUsername(String username){
        try{
            return entityManager.createQuery("from Patient p where p.username= :username ",Patient.class)
                    .setParameter("username", username).getSingleResult();
        }catch (Exception e){
            return null;
        }
    }

    public Patient getByPassword(String password){
        try{
            return entityManager.createQuery("from Patient p where p.password= :password",Patient.class)
                    .setParameter("password", password).getSingleResult();
        }catch (Exception e){
            return null;
        }
    }


    public List<Carb> getCarbList(long patientId){
        try{
        return entityManager.createQuery("SELECT c  FROM Patient p inner join p.carbList c WHERE p.id = :patientId",
                Carb.class)
                .setParameter("patientId", patientId)
                .getResultList();
        }catch(Exception e){
            return null;
        }
    }


    public List<Double> getCarbAverageList(long patientId, Date start, Date end){
        try{
        return entityManager.createQuery("SELECT avg(c.carb)  FROM Patient p inner join p.carbList c WHERE p.id = :patientId " +
                        "and  c.date> :start and c.date< :end " +
                "group by c.simpleDate", Double.class)
                .setParameter("patientId", patientId).setParameter("start", start).setParameter("end", end)
                .getResultList();
        }catch(Exception e){
            return null;
        }
    }


    public List<Carb> getCarbList(long patientId, long days){
        Date date= Date.from(ZonedDateTime.now().minusDays(days).toInstant());
        try {
            return entityManager.createQuery("SELECT c  FROM Patient p inner join p.carbList c WHERE p.id = :patientId " +
                    "and c.date>= :date", Carb.class)
                    .setParameter("patientId", patientId).setParameter("date", date)
                    .getResultList();
        }catch (Exception e){
            return null;
        }
    }




    public List<Glucose> getGlucoseList(long patientId, long days){
        Date date= Date.from(ZonedDateTime.now().minusDays(days).toInstant());
        try {
            return entityManager.createQuery("SELECT c  FROM Patient p inner join p.glucoseList c WHERE p.id = :patientId " +
                    "and c.date>= :date", Glucose.class)
                    .setParameter("patientId", patientId).setParameter("date", date)
                    .getResultList();
        }catch (Exception e){
            return null;
        }
    }




    public List<Date> getCarbDateList(long patientId, Date start, Date end){
        try{
        return entityManager.createQuery("SELECT c.simpleDate  FROM Patient p inner join p.carbList c WHERE p.id = :patientId " +
                "and  c.date> :start and c.date< :end " +
                "group by c.simpleDate", Date.class)
                .setParameter("patientId", patientId).setParameter("start", start).setParameter("end", end)
                .getResultList();
        }catch(Exception e){
            return null;
        }
    }


    public List<Glucose> getGlucoseList(long patientId){
        try{
        return entityManager.createQuery("SELECT c  FROM Patient p inner join p.glucoseList c WHERE p.id = :patientId",
                Glucose.class)
                .setParameter("patientId", patientId)
                .getResultList();
        }catch(Exception e){
            return null;
        }
    }




    public List<Consultation> getConsultationList(long patientId){
        try{
        return entityManager.createQuery("SELECT c  FROM Patient p inner join p.consultationList c WHERE p.id = :patientId order by c.date DESC ",
                Consultation.class)
                .setParameter("patientId", patientId)
                .getResultList();
        }catch(Exception e){
            return null;
        }
    }

    public Double getCarbAverage(long patientId,Date start, Date end){
        try {
            return entityManager.createQuery("SELECT Avg(c.carb)  FROM Patient p inner join p.carbList c WHERE p.id = :patientId " +
                    "and  c.date> :start and c.date< :end ", Double.class)
                    .setParameter("patientId", patientId).setParameter("start", start).setParameter("end", end)
                    .getSingleResult();
        }catch (Exception e){
            return null;
        }
    }


    public Double getGlucoseAverage(long patientId,Date start, Date end){
        try {
            return entityManager.createQuery("SELECT Avg(c.glucose)  FROM Patient p inner join p.glucoseList c WHERE p.id = :patientId " +
                    "and  c.date> :start and c.date< :end ", Double.class)
                    .setParameter("patientId", patientId).setParameter("start", start).setParameter("end", end)
                    .getSingleResult();
        }catch (Exception e){
            return null;
        }
    }

    public List<Patient> getInactiveCarbPatient(Long days){
        Date date= Date.from(ZonedDateTime.now().minusDays(days).toInstant());
        try{
            return entityManager.createQuery("SELECT p  FROM Patient p " +
                    "where p.recentCarb <= :date",
                    Patient.class)
                    .setParameter("date", date)
                    .getResultList();

        }catch (Exception e){
            return null;
        }
    }

    public List<Patient> getInactiveGlucosePatient(Long days){
        Date date= Date.from(ZonedDateTime.now().minusDays(days).toInstant());
        try{
            return entityManager.createQuery("SELECT p  FROM Patient p " +
                    "where p.recentGlucose <= :date",
                    Patient.class)
                    .setParameter("date", date)
                    .getResultList();

        }catch (Exception e){
            return null;
        }
    }


}
