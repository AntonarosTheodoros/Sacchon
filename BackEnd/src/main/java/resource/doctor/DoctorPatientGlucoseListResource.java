package resource.doctor;

import exception.AuthorizationException;
import jpaUtil.JpaUtil;
import model.Glucose;
import org.restlet.resource.Get;
import org.restlet.resource.Post;
import org.restlet.resource.ServerResource;
import repository.GlucoseRepository;
import repository.PatientRepository;
import representation.GlucoseRepresentation;
import resource.ResourceUtils;
import security.Shield;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

public class DoctorPatientGlucoseListResource extends ServerResource {
    private long patientId;

    protected void doInit(){
        patientId= Long.parseLong(getAttribute("patientId"));
    }


    @Get("json")
    public List<GlucoseRepresentation> getGlucoseList() throws AuthorizationException {
        ResourceUtils.checkRole(this, Shield.ROLE_DOCTOR);
        EntityManager em= JpaUtil.getEntityManager();

        PatientRepository patientRepository= new PatientRepository(em);
        List<Glucose> glucoseList= patientRepository.getGlucoseList(this.patientId);
        List<GlucoseRepresentation> glucoseRepresentationList= new ArrayList<>();

        for(Glucose c: glucoseList) {
            glucoseRepresentationList.add(new GlucoseRepresentation(c));
        }

        em.close();
        return glucoseRepresentationList;
    }

    @Post("json")
    public GlucoseRepresentation add(GlucoseRepresentation glucoseRepresentationIn) throws AuthorizationException {
        ResourceUtils.checkRole(this, Shield.ROLE_DOCTOR);
        if(glucoseRepresentationIn==null) return null;

        glucoseRepresentationIn.setPatientId(this.patientId);
        Glucose glucose= glucoseRepresentationIn.createGlucose();
        EntityManager em= JpaUtil.getEntityManager();
        GlucoseRepository glucoseRepository= new GlucoseRepository(em);
        glucoseRepository.save(glucose);
        GlucoseRepresentation g= new GlucoseRepresentation(glucose);
        return g;
    }
}
