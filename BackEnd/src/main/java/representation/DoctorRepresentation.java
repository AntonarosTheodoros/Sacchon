package representation;

import lombok.Data;
import lombok.NoArgsConstructor;
import model.Doctor;
@Data
@NoArgsConstructor
public class DoctorRepresentation {
    private long id;
    private String username;
    private String password;
    private String name;
    private String address;
    private String email;
    private String uri;

    public DoctorRepresentation(Doctor doctor) {
        if (doctor != null) {
            id= doctor.getId();
            username= doctor.getUsername();
            password = doctor.getPassword();
            name = doctor.getName();
            address = doctor.getAddress();
            email = doctor.getEmail();
            uri =  "http://localhost:9000/v1/doctor/" + doctor.getId();
        }

    }

    public Doctor createDoctor() {
        Doctor doctor = new Doctor();
        doctor.setUsername(username);
        doctor.setPassword(password);
        doctor.setName(name);
        doctor.setAddress(address);
        doctor.setEmail(email);
        return doctor;
    }
}
