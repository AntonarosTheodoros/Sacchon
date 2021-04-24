package resource;

import exception.AuthorizationException;
import jpaUtil.JpaUtil;
import model.Glucose;
import org.restlet.resource.Get;
import org.restlet.resource.Post;
import org.restlet.resource.ServerResource;
import repository.GlucoseRepository;
import representation.GlucoseRepresentation;
import security.Shield;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class GlucoseListResource extends ServerResource {
    @Get("json")
    public List<GlucoseRepresentation> getGlucose() throws AuthorizationException {
        ResourceUtils.checkRole(this, Shield.ROLE_CHIEF_DOCTOR);
        EntityManager em = JpaUtil.getEntityManager();
        GlucoseRepository glucoseRepository = new GlucoseRepository(em);
        List<Glucose> glucoses = glucoseRepository.findAll();
        em.close();

        List<GlucoseRepresentation> glucoseRepresentationList = new ArrayList<>();
        for (Glucose p : glucoses)
            glucoseRepresentationList.add(new GlucoseRepresentation(p));

        return glucoseRepresentationList;
    }

    @Post("json")
    public GlucoseRepresentation add(GlucoseRepresentation glucoseRepresentationIn) throws AuthorizationException {
        ResourceUtils.checkRole(this, Shield.ROLE_CHIEF_DOCTOR);
        if(glucoseRepresentationIn==null) return null;

        Glucose glucose= glucoseRepresentationIn.createGlucose();
        if(glucoseRepresentationIn.getDate()==null) glucose.setDate(new Date());
        EntityManager em= JpaUtil.getEntityManager();
        GlucoseRepository glucoseRepository= new GlucoseRepository(em);
        glucoseRepository.save(glucose);
        GlucoseRepresentation p= new GlucoseRepresentation(glucose);
        return p;
    }
}
