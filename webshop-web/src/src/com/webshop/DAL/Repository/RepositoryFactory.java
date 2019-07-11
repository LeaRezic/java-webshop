package src.com.webshop.DAL.Repository;

public final class RepositoryFactory {

    public static Repository getRepo() {
        return DBRepository.getInstance();
    }
}
