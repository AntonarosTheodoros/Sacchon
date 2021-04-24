package resource;

import exception.AuthorizationException;
import model.ChiefDoctor;
import org.restlet.resource.Get;
import org.restlet.resource.Post;
import org.restlet.resource.ServerResource;
import jpaUtil.JpaUtil;
import model.ChiefDoctor;
import repository.ChiefDoctorRepository;
import representation.ChiefDoctorRepresentation;
import security.Shield;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;

public class ChiefDoctorResource extends ServerResource{
    private long id;

    protected void doInit(){
        id= Long.parseLong(getAttribute("id"));
    }


    @Get("json")
    public ChiefDoctorRepresentation getChiefDoctor() throws AuthorizationException {
//        ResourceUtils.checkRole(this, Shield.ROLE_CHIEF_DOCTOR);
        EntityManager em= JpaUtil.getEntityManager();
        ChiefDoctorRepository chiefDoctorRepository= new ChiefDoctorRepository(em);
        ChiefDoctor chiefDoctor= chiefDoctorRepository.read(id);
        ChiefDoctorRepresentation chiefDoctorRepresentation= new ChiefDoctorRepresentation(chiefDoctor);
        em.close();
        return chiefDoctorRepresentation;
    }
}
