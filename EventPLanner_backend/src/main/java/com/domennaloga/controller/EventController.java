package com.domennaloga.controller;

import com.domennaloga.model.Event;
import com.domennaloga.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/event")
public class EventController {      // Can be tested on https://web.postman.co//

    @Autowired
    private EventService eventService;

    // Add a new Event
    @PostMapping("/addEvent")
    public Event addEvent(@RequestBody Event event) { return eventService.addEvent(event); }

    // Edit an Event
    @PutMapping("/updateEvent")
    private Event updateEvent(@RequestBody Event event) { return eventService.updateEvent(event); }

    // Get event by name
    /*
    @GetMapping("/editEventByName/{name}")
    public Event editEventByName(@PathVariable String name) { };//return eventService.getEventByName(name); }*/

    // Get all Events
    @GetMapping("/getAll")
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    // Delete Event
    @DeleteMapping("/deleteEventByID/{id}")
    public boolean deleteEvent(@PathVariable int id) { return eventService.deleteEvent(id); }

}

