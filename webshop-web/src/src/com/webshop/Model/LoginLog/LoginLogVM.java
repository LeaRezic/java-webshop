package src.com.webshop.Model.LoginLog;

public class LoginLogVM {

    private int loginLogId;
    private String username;
    private String ipAddress;
    private String date;
    private boolean register;

    public LoginLogVM(int loginLogId, String username, String ipAddress, String date, boolean register) {
        this.loginLogId = loginLogId;
        this.username = username;
        this.ipAddress = ipAddress;
        this.date = date;
        this.register = register;
    }
}
