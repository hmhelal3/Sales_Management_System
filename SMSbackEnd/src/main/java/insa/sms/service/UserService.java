package insa.sms.service;

import insa.sms.model.User;
import insa.sms.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepo userRepo;
//    PasswordEncoder passwordEncoder;
    @Autowired
    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
//       this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public User findByUserName(String userName) {
        System.out.println("existing User name     xxx "+ userName);
        return userRepo.findUserByUserName(userName);
    }

    public User saveUser(User user) {
        // Additional logic like password encryption can be added here
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        return userRepo.save(user);
    }
}
