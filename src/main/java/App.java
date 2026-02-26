import java.util.HashMap;
import java.util.Map;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@RequestMapping("/api/auth")
public class App {

    private Map<String, String> users = new HashMap<>();
    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }

    @PostMapping("/register")
    public String register(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");

        if (users.containsKey(email)) {
            return "Email already exists";
        }

        users.put(email, encoder.encode(password));
        return "User registered";
    }
}
