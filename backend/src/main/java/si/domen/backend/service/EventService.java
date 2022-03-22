package si.domen.backend.service;

import si.domen.backend.model.Event;
import si.domen.backend.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event getByID(int id) {
        Event existingEvent = eventRepository.getById(id);
        return existingEvent;
    }

    // This function wil verify if the new event title is already within the database
    // if not the new object value will be saved.
    public Event addEvent(Event event) {
        Event existingEvent = eventRepository.findByTitle(event.getTitle());

        if (existingEvent != null) System.out.println("The event name already exists!");
        else return eventRepository.save(event);

        return null;
    }

    // This function will update an existing event's variables in the database, if given its unique ID
    public Event updateEvent(Event event) {
        Event existingEvent = eventRepository.findById(event.getId()).orElse(null);

        if(existingEvent == null) {
            System.out.println("The event was not found");
            // return eventRepository.save(event);
        } else {
            existingEvent.setTitle(event.getTitle());
            existingEvent.setStartDate(event.getStartDate());
            existingEvent.setEndDate(event.getEndDate());
            existingEvent.setMaxQuantity(event.getMaxQuantity());
            existingEvent.setAttendanceFee(event.getAttendanceFee());
            existingEvent.setDescription(event.getDescription());

            return eventRepository.save(existingEvent);
        }
        return null;
    }

    public boolean deleteEvent(int id) {
        Event existingEvent = eventRepository.getById(id);

        if (existingEvent != null) {
            eventRepository.deleteById(id);
            return true;
        } return  false;
    }
}

