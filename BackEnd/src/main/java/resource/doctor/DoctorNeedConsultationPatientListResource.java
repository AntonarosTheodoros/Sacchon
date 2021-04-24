package resource.doctor;

import exception.AuthorizationException;
import jpaUtil.JpaUtil;
import model.Patient;
import org.restlet.resource.Get;
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

public class DoctorNeedConsultationPatientListResource extends ServerResource {
    private long doctorId;

    protected void doInit(){
        doctorId= Long.parseLong(getAttribute("doctorId"));
    }

    @Get("json")
    public List<PatientRepresentation> getPatientList() throws AuthorizationException {
        ResourceUtils.checkRole(this, Shield.ROLE_DOCTOR);
        EntityManager em= JpaUtil.getEntityManager();


        DoctorRepository doctorRepository= new DoctorRepository(em);
        List<Patient> patientList= doctorRepository.getNeedConsultationPatientList(this.doctorId);

        List<PatientRepresentation> patientRepresentationList= new ArrayList<>();

        for(Patient patient: patientList) {
            patientRepresentationList.add(new PatientRepresentation(patient));
        }

        em.close();

        return patientRepresentationList;
    }
}