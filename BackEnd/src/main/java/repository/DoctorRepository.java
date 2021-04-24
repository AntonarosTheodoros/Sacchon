package repository;

import model.Consultation;
import model.Doctor;
import model.Patient;

import javax.persistence.EntityManager;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;

public class DoctorRepository extends Repository<Doctor, Long>{
    private EntityManager entityManager;

    public DoctorRepository(EntityManager entityManager) {

        super(entityManager);
        this.entityManager= entityManager;
    }

    @Override
    public Class<Doctor> getEntityClass() {
        return Doctor.class;
    }

    @Override
    public String getClassName() {
        return Doctor.class.getName();
    }

    public Doctor getByUsername(String username){
        try{
            return entityManager.createQuery("from Doctor p where p.username='"+username+ "'",Doctor.class).getSingleResult();
        }catch(Exception e){
            return null;
        }

    }

    public Doctor getByPassword(String password){
        try{
            return entityManager.createQuery("from Doctor p where p.password='"+password+ "'",Doctor.class).getSingleResult();
        }catch(Exception e){
            return null;
        }

    }

    public List<Patient> getPatientList(long doctorId) {
        try{
        return entityManager.createQuery(" SELECT p FROM Patient p WHERE  p.doctor.id = :id ", Patient.class)
                .setParameter("id",doctorId).getResultList();
        }catch(Exception e){
            return null;
        }

    }

    public List<Consultation> getConsultationList(Long doctorId){
        try{
        return entityManager.createQuery("SELECT c  FROM Doctor p inner join p.consultationList c WHERE p.id = :doctorId",
                Consultation.class)
                .setParameter("doctorId", doctorId)
                .getResultList();
        }catch(Exception e){
            return null;
        }
    }

    public List<Patient> getNeedConsultationPatientList(long doctorId) {
        Date date = Date.from(ZonedDateTime.now().minusMonths(1).toInstant());
        try {
            return entityManager.createQuery(" SELECT distinct p from Consultation c right join c.patient p " +
                            "where p.doctor.id=:id " +
                            "and p.recentConsultation< :oldDate " +
                            "and p.dateRegistered< :oldDate " +
                            "and p.glucoseList.size<=30 " +
                            "and p.carbList.size<=30"
                    , Patient.class).setParameter("id", doctorId).setParameter("oldDate", date).getResultList();
        }catch(Exception e){
            return null;
        }
    }


    public List<Patient> getNeedConsultationPatientList() {
        Date date = Date.from(ZonedDateTime.now().minusMonths(1).toInstant());
        try {
            return entityManager.createQuery(" SELECT p from Consultation c join c.patient p " +
                            "WHERE  c.date< :oldDate"
                    , Patient.class).setParameter("oldDate", date).getResultList();
        }catch(Exception e){
            return null;
        }
    }


    public List<Date> getNeedConsultationPatientDateList() {
        Date date = Date.from(ZonedDateTime.now().minusMonths(1).toInstant());
        try {
            return entityManager.createQuery(" SELECT c.date from Consultation c join c.patient p " +
                            "WHERE  c.date< :oldDate"
                    , Date.class).setParameter("oldDate", date).getResultList();
        }catch(Exception e){
            return null;
        }
    }



    public List<Patient> getUnconsultedPatientList() {
        Date oldDate = Date.from(ZonedDateTime.now().minusMonths(1).toInstant());
        try{
        return entityManager.createQuery(" SELECT p FROM Patient p WHERE  p.doctor.id is null " +
                "and p.dateRegistered< :oldDate " +
                "and p.carbList.size <= 30 " +
                "and p.glucoseList.size<= 30", Patient.class)
                .setParameter("oldDate", oldDate).getResultList();
        }catch(Exception e){
            return null;
        }
    }

    public List<Consultation> getConsultationList(Long doctorId, Long days ){
        Date date= Date.from(ZonedDateTime.now().minusDays(days).toInstant());
        try {
            return entityManager.createQuery("SELECT c  FROM Doctor p inner join p.consultationList c WHERE p.id = :doctorId " +
                    "and c.date>= :date",
                    Consultation.class)
                    .setParameter("doctorId", doctorId).setParameter("date", date)
                    .getResultList();
        }catch (Exception e){
            return null;
        }
    }
    public List<Doctor> getInactiveDoctor(Long days){
        Date date= Date.from(ZonedDateTime.now().minusDays(days).toInstant());
        try{
            return entityManager.createQuery("SELECT d  FROM Doctor d " +
                            "where d.recentConsultation <= :date",
                    Doctor.class)
                    .setParameter("date", date)
                    .getResultList();

        }catch (Exception e){
            return null;
        }
    }

}
