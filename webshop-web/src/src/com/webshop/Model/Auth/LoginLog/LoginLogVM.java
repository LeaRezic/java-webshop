package src.com.webshop.Model.Auth.LoginLog;

public class LoginLogVM {

    private int loginLogId;
    private String username;
    private String ipAddress;
    private boolean register;

    public LoginLogVM(int loginLogId, String username, String ipAddress, boolean register) {
        this.loginLogId = loginLogId;
        this.username = username;
        this.ipAddress = ipAddress;
        this.register = register;
    }

    public int getLoginLogId() {
        return loginLogId;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public boolean isRegister() {
        return register;
    }

    public String getUsername() {
        return username;
    }
}
