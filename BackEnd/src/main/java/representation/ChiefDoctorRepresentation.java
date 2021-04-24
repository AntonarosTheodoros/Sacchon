package representation;

import lombok.Data;
import lombok.NoArgsConstructor;
import model.ChiefDoctor;

import java.util.Date;

@Data
@NoArgsConstructor
public class ChiefDoctorRepresentation {
    private long id;
    private String username;
    private String password;
    private String name;
    private String address;
    private String email;
    private String uri;

    public ChiefDoctorRepresentation(ChiefDoctor chiefDoctor) {
        if (chiefDoctor != null) {
            id= chiefDoctor.getId();
            username= chiefDoctor.getUsername();
            password = chiefDoctor.getPassword();
            name = chiefDoctor.getName();
            address = chiefDoctor.getAddress();
            email = chiefDoctor.getEmail();
            uri =  "http://localhost:9000/v1/chiefDoctor/" + chiefDoctor.getId();
        }

    }

    public ChiefDoctor createChiefDoctor() {
        ChiefDoctor chiefDoctor = new ChiefDoctor();
        chiefDoctor.setUsername(username);
        chiefDoctor.setPassword(password);
        chiefDoctor.setName(name);
        chiefDoctor.setAddress(address);
        chiefDoctor.setEmail(email);
        return chiefDoctor;
    }
}