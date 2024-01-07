package ch.wiss.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ch.wiss.model.Kontakt;


/**
 * Spring Data JPA-Repository für Kontakt-Entitäten.
 * Ermöglicht grundlegende CRUD-Operationen auf der Kontakt-Datenbanktabelle.
 */
@Repository
public interface KontaktRepository extends JpaRepository <Kontakt, Integer> {

}
