package com.domennaloga.service;

import com.domennaloga.model.Event;
import com.domennaloga.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;

    // This function wil verify if the new event title is already within the database
    // if not the new object value will be saved.
    public Event addEvent(Event event) {
        Event existingEvent = eventRepository.findByTitle(event.getTitle());

        if (existingEvent != null) System.out.println("The event name already exists!");
        else return eventRepository.save(event);

        return null;
    }

    // This get event simply returns a List of all the events.
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    // This function will update an existing event's variables in the database, if given its unique ID
    public Event updateEvent(Event event) {
        Event existingEvent = eventRepository.findById(event.getId()).orElse(null);

        if(existingEvent == null) {
            System.out.println("The event was not found");
            // return eventRepository.save(event);
        } else {
            existingEvent.setTitle(event.getTitle());
            existingEvent.setStart_date(event.getStart_date());
            existingEvent.setEnd_date(event.getEnd_date());
            existingEvent.setMax_quantity(event.getMax_quantity());
            existingEvent.setAttendance_fee(event.getAttendance_fee());
            existingEvent.setDescription(event.getDescription());

            return eventRepository.save(existingEvent);
        }
        return null;
    }

    // This function will delete an existing event from the database, if given its unique ID
    public boolean deleteEvent(int id) {
        Event existingEvent = eventRepository.getById(id);

        if (existingEvent != null) {
            eventRepository.deleteById(id);
            return true;
        } return  false;
    }
}

