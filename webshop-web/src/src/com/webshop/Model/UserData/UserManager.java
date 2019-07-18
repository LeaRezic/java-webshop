package src.com.webshop.Model.UserData;

import src.com.webshop.DAL.Entities.RoleEntity;
import src.com.webshop.DAL.Entities.UserAccountEntity;
import src.com.webshop.DAL.Repository.Repository;
import src.com.webshop.DAL.Repository.RepositoryFactory;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class UserManager {

    private static Repository repo = RepositoryFactory.getRepo();

    public static boolean validatePassword(String username, String password) {
        UserVM user = getUserByUsername(username);
        if (user == null) {
            return false;
        }
        return user.getPassword().equals(password);
    }

    public static UserVM getUserByUsername(String username) {
        UserAccountEntity entity = repo.getUserByUsername(username);
        if (entity == null) {
            return null;
        }
        return getUserVmFromEntity(entity);
    }

    private static UserVM getUserVmFromEntity(UserAccountEntity entity) {
        return new UserVM(
                entity.giveId(),
                entity.getUuid(),
                entity.getEmail(),
                getRoleName(entity.getRoleId()),
                entity.getPassword()
        );
    }

    private static String getRoleName(int roleId) {
        RoleEntity role = repo.getRole(roleId);
        if (role == null) {
            return "UNKNOWN";
        }
        return role.getRoleName();
    }

    public static String insertUser(String email, String password, boolean isAdmin) {
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

    public static List<UserDataVM> getUsersData() {
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
