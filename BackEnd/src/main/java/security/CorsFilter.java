package security;

import org.restlet.Application;
import org.restlet.Request;
import org.restlet.Response;
import org.restlet.Restlet;
import org.restlet.data.Header;
import org.restlet.data.Method;
import org.restlet.engine.header.HeaderConstants;
import org.restlet.routing.Filter;
import org.restlet.util.Series;

import java.util.Collections;
import java.util.HashSet;

public class CorsFilter {
    private Application application;

    public CorsFilter(Application application){
        this.application = application;
    }


    public Filter createCorsFilter(Restlet next) {
        Filter filter = new Filter(application.getContext(), next) {

            @Override
            protected int beforeHandle(Request request, Response response) {
                // Initialize response headers

                Series<Header> responseHeaders = (Series<Header>) response
                        .getAttributes().get(HeaderConstants.ATTRIBUTE_HEADERS);
                if (responseHeaders == null) {
                    responseHeaders = new Series<Header>(Header.class);
                }

                // Request headers

                Series<Header> requestHeaders = (Series<Header>) request.getAttributes().get(HeaderConstants.ATTRIBUTE_HEADERS);
                String requestOrigin = requestHeaders.getFirstValue("Origin", false, "*");
                String rh = requestHeaders.getFirstValue( "Access-Control-Request-Headers", false, "*");

                response.setAccessControlAllowCredentials(true);
                response.setAccessControlAllowOrigin(requestOrigin);
                response.setAccessControlAllowHeaders(Collections.singleton("*"));

                HashSet<Method> methodHashSet = new HashSet<>();
                methodHashSet.add(Method.GET);
                methodHashSet.add(Method.POST);
                methodHashSet.add(Method.PUT);
                methodHashSet.add(Method.DELETE);

                response.setAccessControlAllowMethods(methodHashSet);

                // Set response headers

                response.getAttributes().put(HeaderConstants.ATTRIBUTE_HEADERS,  responseHeaders);

                // Handle HTTP methods

                if (Method.OPTIONS.equals(request.getMethod())) {
                    return Filter.STOP;
                }
                return super.beforeHandle(request, response);
            }
        };
        return filter;
    }
}
