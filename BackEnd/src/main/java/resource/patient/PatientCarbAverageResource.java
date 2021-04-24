package resource.patient;

import exception.AuthorizationException;
import jpaUtil.JpaUtil;
import model.Carb;
import model.Glucose;
import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;
import repository.PatientRepository;
import resource.ResourceUtils;
import security.Shield;

import javax.persistence.EntityManager;
import java.util.Date;
import java.util.List;

public class PatientCarbAverageResource extends ServerResource {
    private long patientId;

    protected void doInit(){

        patientId= Long.parseLong(getAttribute("patientId"));
    }

    @Get
    public Double getAverageCarb() throws AuthorizationException {
        ResourceUtils.checkRole(this, Shield.ROLE_PATIENT);
        String start= getQueryValue("start");
        String end= getQueryValue("end");
        Date dateStart= ResourceUtils.stringToDate(start,-1);
        Date dateEnd= ResourceUtils.stringToDate(end, 1);

        EntityManager em= JpaUtil.getEntityManager();

        PatientRepository patientRepository= new PatientRepository(em);
        Double carb= patientRepository.getCarbAverage(this.patientId, dateStart, dateEnd);

        em.close();
        return carb;
    }
}
