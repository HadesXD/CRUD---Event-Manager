package si.domen.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		log.info("Simple log statement with inputs {}, {} and {}", 1, 2, 3);
		SpringApplication.run(BackendApplication.class, args);
	}

}
