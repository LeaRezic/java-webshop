package src.com.webshop.Model.UserData;

public class UserDataVM {

    private String username;
    private String uuid;
    private int totalReceipts;
    private String userSince;

    public UserDataVM(String username, String uuid, int totalReceipts, String userSince) {
        this.username = username;
        this.uuid = uuid;
        this.totalReceipts = totalReceipts;
        this.userSince = userSince;
    }

}
