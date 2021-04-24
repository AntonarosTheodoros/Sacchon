package resource;

import exception.AuthorizationException;
import org.restlet.resource.ServerResource;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class ResourceUtils {
    public static void checkRole(ServerResource serverResource, String role)  throws AuthorizationException {
        if (!serverResource.isInRole(role)) {
            throw new AuthorizationException( "You're not authorized to send this call.");
        }
    }
    public static Date stringToDate(String date, int offset){
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yy");
        Calendar c = Calendar.getInstance();
        try {
            c.setTime(formatter.parse(date));
            c.add(Calendar.DAY_OF_MONTH, offset);
            return c.getTime();
        } catch (ParseException e) {
            return null;
        }
    }
    public static String dateToString(Date date){
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yy");
        return formatter.format(date);
    }
}
