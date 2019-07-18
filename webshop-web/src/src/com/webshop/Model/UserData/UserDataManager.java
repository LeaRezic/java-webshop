package src.com.webshop.Model.UserData;

import src.com.webshop.DAL.Entities.UserAccountEntity;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class UserDataManager extends ManagerBase {

    public String insertUser(String email, String password, boolean isAdmin) {
        UserAccountEntity entity = new UserAccountEntity();
        String uuid = UUID.randomUUID().toString();
        entity.setUuid(uuid);
        entity.setEmail(email);
        entity.setPassword(password);
        entity.setActive(true);
        entity.setRoleId(isAdmin ? 1 : 2);
        entity.setCreatedOn(new Timestamp(System.currentTimeMillis()));
        boolean inserted = repo.insertUser(entity);
        if (!inserted) {
            return null;
        }
        return uuid;
    }

    public List<UserDataVM> getUsersData() {
        List<UserDataVM> usersData = new ArrayList<>();
        List<UserAccountEntity> entities = repo.getUsers();
        entities.forEach((entity) -> usersData.add(new UserDataVM(
                entity.getEmail(),
                entity.getUuid(),
                repo.getReceiptsForCustomer(entity.getUuid()).size(),
                entity.getCreatedOn().toString()
        )));
        return usersData;
    }
}
