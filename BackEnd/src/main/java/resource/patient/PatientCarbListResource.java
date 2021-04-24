package resource.patient;

import exception.AuthorizationException;
import jpaUtil.JpaUtil;
import model.Carb;
import model.Patient;
import org.restlet.resource.*;
import repository.CarbRepository;
import repository.PatientRepository;
import representation.CarbRepresentation;
import representation.PatientRepresentation;
import resource.ResourceUtils;
import security.Shield;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

public class PatientCarbListResource extends ServerResource {
    private long patientId;

    protected void doInit(){

        patientId= Long.parseLong(getAttribute("patientId"));
    }


    @Get("json")
    public  List<CarbRepresentation> getCarbList() throws AuthorizationException {
        ResourceUtils.checkRole(this, Shield.ROLE_PATIENT);
        EntityManager em= JpaUtil.getEntityManager();

        PatientRepository patientRepository= new PatientRepository(em);
        List<Carb> carbList= patientRepository.getCarbList(this.patientId);
        List<CarbRepresentation> carbRepresentationList= new ArrayList<>();

        for(Carb c: carbList) {
            carbRepresentationList.add(new CarbRepresentation(c));
        }

        em.close();
        return carbRepresentationList;
    }

    @Post("json")
    public CarbRepresentation addCarb(CarbRepresentation carbRepresentationIn) throws AuthorizationException {
        ResourceUtils.checkRole(this, Shield.ROLE_PATIENT);
        if(carbRepresentationIn==null) return null;

        carbRepresentationIn.setPatientId(this.patientId);
        Carb carb= carbRepresentationIn.createCarb();
        EntityManager em= JpaUtil.getEntityManager();
        CarbRepository carbRepository= new CarbRepository(em);
        carbRepository.save(carb);
        CarbRepresentation c= new CarbRepresentation(carb);

        PatientRepository patientRepository= new PatientRepository(em);
        Patient patient= patientRepository.read(patientId);

        em.detach(patient);
        patient.setRecentCarb(carb.getDate());
        patientRepository.update(patient);

        em.close();

        return c;
    }

}

