package com.domennaloga.repository;

import com.domennaloga.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event,Integer> {
    Event findByTitle(String title);
}
