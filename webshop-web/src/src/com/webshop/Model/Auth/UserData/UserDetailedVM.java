package src.com.webshop.Model.Auth.UserData;

public class UserDetailedVM {

    private String username;
    private String uuid;
    private int totalReceipts;
    private String userSince;
    private String lastLogin;

    public UserDetailedVM(String username, String uuid, int totalReceipts, String userSince, String lastLogin) {
        this.username = username;
        this.uuid = uuid;
        this.totalReceipts = totalReceipts;
        this.userSince = userSince;
        this.lastLogin = lastLogin;
    }

}
