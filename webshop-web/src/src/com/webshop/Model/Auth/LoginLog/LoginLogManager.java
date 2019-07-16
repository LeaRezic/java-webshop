package src.com.webshop.Model.Auth.LoginLog;

import src.com.webshop.DAL.Entities.LoginLogEntity;
import src.com.webshop.DAL.Repository.Repository;
import src.com.webshop.DAL.Repository.RepositoryFactory;
import src.com.webshop.Model.Auth.AuthRequestData;
import src.com.webshop.Util.DummyLogger.LoggerUtil;

import java.sql.Timestamp;
import java.util.Date;

public class LoginLogManager {

    private static Repository repo = RepositoryFactory.getRepo();

    public static void logNewLogin(AuthRequestData authRequestData) {
        LoggerUtil.log("[LOGIN LOG MANAGER]: inserting new login.");
        LoggerUtil.log("[username]: " + authRequestData.getCredentials().getUsername());
        LoggerUtil.log("[ip]: " + authRequestData.getVisitorAddress());
        newLog(authRequestData, false);
    }

    public static void logNewRegister(AuthRequestData authRequestData) {
        LoggerUtil.log("[LOGIN LOG MANAGER]: inserting new register.");
        LoggerUtil.log("[username]: " + authRequestData.getCredentials().getUsername());
        LoggerUtil.log("[ip]: " + authRequestData.getVisitorAddress());
        newLog(authRequestData, true);
    }

    private static void newLog(AuthRequestData authRequestData, boolean isRegister) {
        LoginLogEntity loginLogEntity = new LoginLogEntity();
        loginLogEntity.setUserName(authRequestData.getCredentials().getUsername());
        loginLogEntity.setIpAddress(authRequestData.getVisitorAddress());
        loginLogEntity.setLoginLogId(0);
        loginLogEntity.setRegister(isRegister);
        loginLogEntity.setLoginDate(new Timestamp(new Date().getTime()));
        boolean jelje = repo.insertLoginLog(loginLogEntity);
        LoggerUtil.log("[PERSISTED]: " + jelje);
    }
}
