package ch.wiss.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.NotNull;

/**
 * Entity-Klasse für Beziehung.
 * Stellt eine Beziehung in der Datenbank dar.
 */
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Beziehung {

    /**
     * Eindeutige ID für die Beziehung.
     * Wird automatisch von der Datenbank generiert.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * Bezeichnung der Beziehung.
     * Darf nicht null sein.
     */
    @NotNull
    private String bezeichnung;
}
