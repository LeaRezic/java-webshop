package src.com.webshop.Model.Auth;

public class AuthRequestData {

    private Credentials credentials;
    private String visitorAddress;

    public AuthRequestData(Credentials credentials, String visitorAddress) {
        this.credentials = credentials;
        this.visitorAddress = visitorAddress;
    }

    public Credentials getCredentials() {
        return credentials;
    }

    public String getVisitorAddress() {
        return visitorAddress;
    }
}
