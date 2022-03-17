package com.domennaloga.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
@Data   // Creates getters and setters
@NoArgsConstructor
@AllArgsConstructor

// The schema/entity for Events
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)     // The IDs get auto incriminated every new entry
    private int id;
    private String title;
    private String start_date;
    private String end_date;
    private int max_quantity;
    private int attendance_fee;
    private String description;
}
