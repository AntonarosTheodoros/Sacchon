package resource;

import exception.AuthorizationException;
import jpaUtil.JpaUtil;
import model.ChiefDoctor;
import org.restlet.resource.Get;
import org.restlet.resource.Post;
import org.restlet.resource.ServerResource;
import repository.ChiefDoctorRepository;
import representation.ChiefDoctorRepresentation;
import security.Shield;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

public class ChiefDoctorListResource extends ServerResource {
    @Get("json")
    public List<ChiefDoctorRepresentation> getChiefDoctor() throws AuthorizationException {
//        ResourceUtils.checkRole(this, Shield.ROLE_CHIEF_DOCTOR);
        EntityManager em = JpaUtil.getEntityManager();
        ChiefDoctorRepository chiefDoctorRepository = new ChiefDoctorRepository(em);
        List<ChiefDoctor> chiefDoctors = chiefDoctorRepository.findAll();
        em.close();

        List<ChiefDoctorRepresentation> chiefDoctorRepresentationList = new ArrayList<>();
        for (ChiefDoctor p : chiefDoctors)
            chiefDoctorRepresentationList.add(new ChiefDoctorRepresentation(p));

        return chiefDoctorRepresentationList;
    }

    @Post("json")
    public ChiefDoctorRepresentation add(ChiefDoctorRepresentation chiefDoctorRepresentationIn) throws AuthorizationException {
//        ResourceUtils.checkRole(this, Shield.ROLE_CHIEF_DOCTOR);
        if(chiefDoctorRepresentationIn==null) return null;
        if(chiefDoctorRepresentationIn.getName()==null) return null;

        ChiefDoctor chiefDoctor= chiefDoctorRepresentationIn.createChiefDoctor();
        EntityManager em= JpaUtil.getEntityManager();
        ChiefDoctorRepository chiefDoctorRepository= new ChiefDoctorRepository(em);
        chiefDoctorRepository.save(chiefDoctor);
        ChiefDoctorRepresentation p= new ChiefDoctorRepresentation(chiefDoctor);
        return p;
    }
}
