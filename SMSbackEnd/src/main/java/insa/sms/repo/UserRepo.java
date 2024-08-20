package insa.sms.repo;

import insa.sms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Integer> {
    public User findUserByUserName(String userName);

}
