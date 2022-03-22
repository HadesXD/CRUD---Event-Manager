package si.domen.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name="EVENTS")
@Data   // Creates getters and setters
@NoArgsConstructor
@AllArgsConstructor

// The schema/entity for Events
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)     // The IDs get auto incriminated every new entry
    @Column(name="EVENT_ID")
    private int id;

    @Column(name="TITLE")
    private String title;

    @Column(name="START_DATE")
    private LocalDate startDate;

    @Column(name="END_DATE")
    private LocalDate endDate;

    @Column(name="MAX_QUANTITY")
    private int maxQuantity;

    @Column(name="ATTENDANCE_FEE")
    private int attendanceFee;

    @Column(name="DESCRIPTION")
    private String description;
}
