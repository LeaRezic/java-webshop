package src.com.webshop.Model.Auth.UserData;

public class UserVM {

    private int id;
    private String uuid;
    private String username;
    private String role;
    private String password;

    public UserVM(int id, String uuid, String username, String role, String password) {
        this.id = id;
        this.uuid = uuid;
        this.username = username;
        this.role = role;
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public String getUuid() {
        return uuid;
    }

    public String getUsername() {
        return username;
    }

    public String getRole() {
        return role;
    }

    public String getPassword() {
        return password;
    }
}
