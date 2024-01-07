package ch.wiss.repository;

import ch.wiss.model.Beziehung;
import org.springframework.data.jpa.repository.JpaRepository;


/**
 * JPA-Repository für Beziehung-Entitäten.
 * Ermöglicht grundlegende CRUD-Operationen und kann für komplexere Abfragen erweitert werden.
 */
public interface BeziehungsRepository extends JpaRepository<Beziehung, Integer> {
}
