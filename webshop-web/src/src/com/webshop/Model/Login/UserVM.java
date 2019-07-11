package src.com.webshop.Model.Login;

public class UserVM {
    private String username;
    private boolean isAdmin;

    public UserVM(String username, boolean isAdmin) {
        this.username = username;
        this.isAdmin = isAdmin;
    }

    public String getUsername() {
        return username;
    }

    public boolean isAdmin() {
        return isAdmin;
    }
}
