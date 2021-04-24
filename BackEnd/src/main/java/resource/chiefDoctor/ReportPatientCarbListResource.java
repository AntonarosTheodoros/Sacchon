package resource.chiefDoctor;

import exception.AuthorizationException;
import jpaUtil.JpaUtil;
import model.Carb;
import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;
import repository.PatientRepository;
import representation.CarbRepresentation;
import resource.ResourceUtils;
import security.Shield;

import javax.persistence.EntityManager;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class ReportPatientCarbListResource extends ServerResource {
    private long patientId;

    protected void doInit(){
        patientId= Long.parseLong(getAttribute("patientId"));
    }

    @Get
    public List<CarbRepresentation> getPatientCarbList() throws AuthorizationException {
        ResourceUtils.checkRole(this, Shield.ROLE_CHIEF_DOCTOR);
        String period = getQueryValue("period");

        Date date1= ResourceUtils.stringToDate(period, 0);
        Date date= new Date();
        long diff = date.getTime() - date1.getTime();
        Long days= TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS);


        EntityManager em = JpaUtil.getEntityManager();
        PatientRepository patientRepository = new PatientRepository(em);
        List<Carb> carbList = patientRepository.getCarbList(patientId, days);
        List<CarbRepresentation> carbRepresentationList = new ArrayList<>();
        for (Carb p : carbList)
            carbRepresentationList.add(new CarbRepresentation(p));
        em.close();
        return carbRepresentationList;
    }
}
