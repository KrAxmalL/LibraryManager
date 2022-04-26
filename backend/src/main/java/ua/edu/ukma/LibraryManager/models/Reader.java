package ua.edu.ukma.LibraryManager.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "reader")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Reader {

    @Id
    @Column(name = "ticket_number")
    private Integer ticketNumber;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "patronymic")
    private String patronymic;

    @ElementCollection
    @CollectionTable(name = "reader_phone", joinColumns = @JoinColumn(name = "reader_ticket_number"))
    @Column(name = "phone_number")
    private List<String> phoneNumbers;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Column(name = "home_city")
    private String homeCity;

    @Column(name = "home_street")
    private String homeStreet;

    @Column(name = "home_building_number")
    private String homeBuildingNumber;

    @Column(name = "home_flat_number")
    private Integer homeFlatNumber;

    @Column(name = "work_place")
    private String workPlace;
}
