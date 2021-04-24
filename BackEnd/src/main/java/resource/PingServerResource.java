package resource;

import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;

public class PingServerResource extends ServerResource {
    @Get("txt")
    public String ping(){

        return "hello";
    }

}