package resource.chiefDoctor;

import exception.AuthorizationException;
import jpaUtil.JpaUtil;
import model.Patient;
import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;
import repository.DoctorRepository;
import representation.PatientRepresentation;
import resource.ResourceUtils;
import security.Shield;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

public class ReportUnconsultedPatientDiffListResource extends ServerResource {

    @Get("json")
    public List<Long> getUnconsultedPatientDiffList() throws AuthorizationException {
        ResourceUtils.checkRole(this, Shield.ROLE_CHIEF_DOCTOR);
        EntityManager em= JpaUtil.getEntityManager();
        DoctorRepository doctorRepository= new DoctorRepository(em);
        List<Date> dateList= doctorRepository.getNeedConsultationPatientDateList();

        List<Long> diff= new ArrayList<>();
        Date currDate= new Date();
        for(Date d: dateList) {
            Long difference = currDate.getTime() - d.getTime();
            diff.add(TimeUnit.DAYS.convert(difference, TimeUnit.MILLISECONDS) - 30);
        }
        em.close();

        return diff;
    }
}