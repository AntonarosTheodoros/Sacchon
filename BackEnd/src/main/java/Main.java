import jpaUtil.JpaUtil;
import org.restlet.Application;
import org.restlet.Component;
import org.restlet.Restlet;
import org.restlet.data.Protocol;
import org.restlet.engine.Engine;
import org.restlet.routing.Router;
import org.restlet.security.ChallengeAuthenticator;
import router.CustomRouter;
import security.Shield;
import security.CorsFilter;

import javax.persistence.EntityManager;

import java.util.logging.Logger;

public class Main extends Application {
    public static final Logger LOGGER= Engine.getLogger(Main.class);
    public static void main(String[] args) throws Exception {

        EntityManager em = JpaUtil.getEntityManager();
        LOGGER.info("Sacchon app starting");
        em.close();
        Component c= new Component();
        c.getServers().add(Protocol.HTTP, 80);
        c.getDefaultHost().attach("/v1", new Main());
        c.start();

        LOGGER.info("sample web api started");
        LOGGER.info("URl: http://localhost:9000/v1/ping");



    }
    public Restlet createInboundRoot(){
        CustomRouter customRouter = new CustomRouter(this);
        Shield shield = new Shield(this);


        Router publicRouter = customRouter.publicResources();

        // Create the api router, protected by a patient guard

        ChallengeAuthenticator guard = shield.createApiGuard();
        Router userRouter = customRouter.protectedResources();
        guard.setNext(userRouter);
        publicRouter.attach(guard);


        CorsFilter corsFilter = new CorsFilter(this);
        return corsFilter.createCorsFilter(publicRouter);

    }



}
