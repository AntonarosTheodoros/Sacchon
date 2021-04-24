package security;

import org.restlet.Application;
import org.restlet.data.ChallengeScheme;
import org.restlet.security.ChallengeAuthenticator;

public class Shield {
    public static final String ROLE_PATIENT = "patient";
    public static final String ROLE_DOCTOR = "doctor";
    public static final String ROLE_CHIEF_DOCTOR = "chiefDoctor";


    private Application application;

    public Shield(Application application) {
        this.application = application;
    }


    public ChallengeAuthenticator createApiGuard() {

        ChallengeAuthenticator apiGuard = new ChallengeAuthenticator(
                application.getContext(), ChallengeScheme.HTTP_BASIC, "protected");


        // - Verifier : checks authentication
        // - Enroler : to check authorization (roles)
        Verifier verifier = new Verifier();
        apiGuard.setVerifier(verifier);

        return apiGuard;
    }
}
