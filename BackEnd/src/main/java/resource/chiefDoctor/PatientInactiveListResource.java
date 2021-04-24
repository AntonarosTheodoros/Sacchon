package resource.chiefDoctor;

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
import javax.swing.text.html.HTMLDocument;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class PatientInactiveListResource extends ServerResource {

    @Get("json")
    public List<PatientRepresentation> getInactivePatientList() throws AuthorizationException {
        ResourceUtils.checkRole(this, Shield.ROLE_CHIEF_DOCTOR);

        String period= getQueryValue("period");
        Date date1= ResourceUtils.stringToDate(period, 0);
        Date date= new Date();
        long diff = date.getTime() - date1.getTime();
        Long days= TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS);

        EntityManager em= JpaUtil.getEntityManager();
        PatientRepository patientRepository= new PatientRepository(em);
        List<Patient> patientCarbList= patientRepository.getInactiveCarbPatient(days);
        List<Patient> patientGlucoseList= patientRepository.getInactiveGlucosePatient(days);

        List<PatientRepresentation> patientRepresentationList= new ArrayList<>();

        if(patientCarbList!=null && patientGlucoseList!=null) {

            Iterator<Patient> carbIterator = patientCarbList.iterator();
            Iterator<Patient> glucoseIterator = patientGlucoseList.iterator();

            while (carbIterator.hasNext() && glucoseIterator.hasNext()) {
                Patient c = carbIterator.next();
                Patient g = glucoseIterator.next();
                if (c != null && g != null) {
                    patientRepresentationList.add(new PatientRepresentation(c));
                }
            }
        }
        em.close();

        return patientRepresentationList;
    }
}
