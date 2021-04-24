package resource.doctor;

import exception.AuthorizationException;
import jpaUtil.JpaUtil;
import model.Patient;
import org.restlet.resource.Get;
import org.restlet.resource.Put;
import org.restlet.resource.ServerResource;
import repository.DoctorRepository;
import repository.PatientRepository;
import representation.PatientRepresentation;
import resource.ResourceUtils;
import security.Shield;

import javax.persistence.EntityManager;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class DoctorNeedConsultationPatientResource extends ServerResource {
    private long doctorId;
    private long needConsultationPatientId;

    protected void doInit() {
        doctorId = Long.parseLong(getAttribute("doctorId"));
        needConsultationPatientId = Long.parseLong(getAttribute("needConsultationPatientId"));
    }

    @Get("json")
    public PatientRepresentation getPatient() throws AuthorizationException {
        ResourceUtils.checkRole(this, Shield.ROLE_DOCTOR);
        EntityManager em = JpaUtil.getEntityManager();
        DoctorRepository doctorRepository = new DoctorRepository(em);
        List<Patient> patientList = doctorRepository.getNeedConsultationPatientList(this.doctorId);

        Patient patient= new Patient();
        for (Patient p : patientList) {
            if(p.getId()== needConsultationPatientId){
                patient= p;
            }
        }
        PatientRepresentation patientRepresentation= new PatientRepresentation(patient);

        em.close();

        return patientRepresentation;
    }

    @Put("json")
    public PatientRepresentation updatePatient(PatientRepresentation patientRepresentation) throws AuthorizationException {
        ResourceUtils.checkRole(this, Shield.ROLE_DOCTOR);
        EntityManager em= JpaUtil.getEntityManager();
        PatientRepository patientRepository= new PatientRepository(em);
        Patient patient= patientRepresentation.createPatient();
        em.detach(patient);
        patient.setId(needConsultationPatientId);
        patientRepository.update(patient);
        return patientRepresentation;
    }
}
