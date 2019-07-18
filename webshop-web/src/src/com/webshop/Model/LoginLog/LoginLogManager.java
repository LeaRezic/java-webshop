package src.com.webshop.Model.LoginLog;

import src.com.webshop.DAL.Entities.LoginLogEntity;
import src.com.webshop.DAL.Repository.DBRepository;
import src.com.webshop.DAL.Repository.Repository;
import src.com.webshop.Model.Auth.AuthRequestData;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class LoginLogManager {

    private static LoginLogManager loginlogManager = null;
    private Repository repo;
    private LoginLogManager() {
        repo = DBRepository.getInstance();
    }
    public static LoginLogManager getInstance() {
        if (loginlogManager == null) {
            return new LoginLogManager();
        }
        return loginlogManager;
    }

    public void logNewLogin(AuthRequestData authRequestData) {
        newLog(authRequestData, false);
    }

    public void logNewRegister(AuthRequestData authRequestData) {
        newLog(authRequestData, true);
    }

    private void newLog(AuthRequestData authRequestData, boolean isRegister) {
        LoginLogEntity loginLogEntity = new LoginLogEntity();
        loginLogEntity.setUserName(authRequestData.getCredentials().getUsername());
        loginLogEntity.setIpAddress(authRequestData.getVisitorAddress());
        loginLogEntity.setLoginLogId(0);
        loginLogEntity.setRegister(isRegister);
        loginLogEntity.setLoginDate(new Timestamp(new Date().getTime()));
        repo.insertLoginLog(loginLogEntity);
    }

    public List<LoginLogVM> getLoginLogs() {
        List<LoginLogVM> models = new ArrayList<>();
        List<LoginLogEntity> entities = repo.getLoginLogs();
        entities.forEach((e) -> models.add(new LoginLogVM(
                e.giveId(),
                e.getUserName(),
                e.getIpAddress(),
                e.getLoginDate().toString(),
                e.isRegister()
        )));
        return models;
    }
}
