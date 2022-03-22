package si.domen.backend.controller;

import si.domen.backend.model.Event;
import si.domen.backend.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class EventController {      // Can be tested on https://web.postman.co//

    @Autowired
    private EventService eventService;

    // Get all Events
    @GetMapping("/event/all")
    public List<Event> getAllEvents() { return eventService.getAllEvents(); }

    // Get by ID
    @GetMapping("/event/{id}")
    public Event getByID(@PathVariable int id) { return eventService.getByID(id); }

    // Add a new Event
    @PostMapping("/event")
    public Event addEvent(@RequestBody Event event) { return eventService.addEvent(event); }

    // Edit an Event
    @PutMapping("/event")
    private Event updateEvent(@RequestBody Event event) { return eventService.updateEvent(event); }

    // Delete Event
    @DeleteMapping("/event/{id}")
    public boolean deleteEvent(@PathVariable int id) { return eventService.deleteEvent(id); }
}

