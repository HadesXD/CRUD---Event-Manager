package si.domen.backend.repository;

import si.domen.backend.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event,Integer> {
    Event findByTitle(String title);
}
