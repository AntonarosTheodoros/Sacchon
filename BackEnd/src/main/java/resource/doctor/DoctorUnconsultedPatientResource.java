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
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class DoctorUnconsultedPatientResource extends ServerResource {
    private long doctorId;
    private long unconsultedPatientId;

    protected void doInit() {
        doctorId = Long.parseLong(getAttribute("doctorId"));
        unconsultedPatientId = Long.parseLong(getAttribute("unconsultedPatientId"));
    }

    @Get("json")
    public PatientRepresentation getPatient() throws AuthorizationException {
        ResourceUtils.checkRole(this, Shield.ROLE_DOCTOR);
        EntityManager em = JpaUtil.getEntityManager();
        DoctorRepository doctorRepository = new DoctorRepository(em);
        List<Patient> patientList = doctorRepository.getUnconsultedPatientList();



        Patient patient= new Patient();
        for (Patient p : patientList) {
            if(p.getId()== unconsultedPatientId){
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
        patient.setId(unconsultedPatientId);
        patientRepository.update(patient);
        return patientRepresentation;
    }
}
