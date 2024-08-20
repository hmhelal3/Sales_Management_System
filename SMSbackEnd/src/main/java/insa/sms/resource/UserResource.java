package insa.sms.resource;

import insa.sms.model.User;
import insa.sms.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserResource{



    private final UserService userService;
    private  AuthenticationManager authenticationManager;

        public UserResource(UserService userService ) {
            this.userService = userService;

        }

        @PostMapping("/add")
        public ResponseEntity<?> signUp(@RequestBody User user) {
            userService.saveUser(user);
            return ResponseEntity.ok("User registered successfully!");
        }

//    @GetMapping("/login")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        User existingUser = userService.findByUserName(user.getUserName());
        if(existingUser !=null){
            System.out.println(existingUser );
            System.out.println("existing User name     xxx "+ existingUser.getUserName() );
            System.out.println("Angular User name     xxx "+ user.getUserName() );
            System.out.println("existing User password     ps "+ existingUser.getPassword() );
            System.out.println("Angular User password     pas "+ user.getPassword() );
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            String encodedPassword = passwordEncoder.encode(user.getPassword());
            if (passwordEncoder.matches(user.getPassword(),existingUser.getPassword())) {
                System.out.println("login correctly  " );
                return ResponseEntity.ok(existingUser);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
    }


//    @PostMapping("/signin")
//    public ResponseEntity<String> authenticateUser(@RequestBody User user){
//        Authentication authentication = authenticationManager.authentለicate(new UsernamePasswordAuthenticationToken(
//                user.getUserName(), user.getPassword()));
//
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        return new ResponseEntity<>("User signed-in successfully!.", HttpStatus.OK);
//    }





}
