package ch.wiss.controller;

import ch.wiss.model.Beziehung;
import ch.wiss.repository.BeziehungsRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * Controller für Beziehung-Operationen.
 * Erlaubt das CRUD-Management von Beziehungen.
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/api/v1/beziehung")
@AllArgsConstructor
public class BeziehungController {

    @Autowired
    private BeziehungsRepository beziehungsRepository;

    /**
     * Holt alle Beziehungen aus der Datenbank.
     * @return Eine Liste von Beziehungen.
     */
    @GetMapping("/getAll")
    public ResponseEntity<Iterable<Beziehung>> getAllBeziehung() {
        Iterable<Beziehung> beziehungen = null;
        try {
            beziehungen = beziehungsRepository.findAll();
        } catch (Exception e) {
            System.out.println("Beziehungen wurden nicht gefunden!");
        }
        return ResponseEntity.ok(beziehungen);
    }

    /**
     * Fügt eine neue Beziehung in die Datenbank hinzu.
     * @param bezeichnung Die Bezeichnung der Beziehung.
     * @return Eine Bestätigungsnachricht.
     */
    @PostMapping(path = "/add")
    public ResponseEntity<String> addNewBeziehung(@RequestParam String bezeichnung) {
        Beziehung beziehung = new Beziehung();
        beziehung.setBezeichnung(bezeichnung);
        try {
            beziehungsRepository.save(beziehung);
        } catch (Exception e) {
            System.out.println("Fehler beim Speichern der Beziehung: " + e.getMessage());
        }
        return ResponseEntity.ok("Beziehung gespeichert");
    }

    /**
     * Aktualisiert eine vorhandene Beziehung in der Datenbank.
     * @param id Die ID der zu aktualisierenden Beziehung.
     * @param bezeichnung Die neue Bezeichnung der Beziehung.
     * @return Eine Bestätigungsnachricht oder ein Fehler, falls die Beziehung nicht gefunden wird.
     */
    @PutMapping(path = "/update/{id}")
    public ResponseEntity<String> updateBeziehung(@PathVariable Integer id,
                                                  @RequestParam(required = false) String bezeichnung) {
        Optional<Beziehung> beziehung = beziehungsRepository.findById(id);
        if (beziehung.isPresent()) {
            if (bezeichnung != null) {
                beziehung.get().setBezeichnung(bezeichnung);
            }
            try {
                beziehungsRepository.save(beziehung.get());
            } catch (Exception e) {
                System.out.println("Fehler beim Speichern der Beziehung: " + e.getMessage());
            }
            return ResponseEntity.ok("Beziehung gespeichert");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Beziehung nicht gefunden");
    }

    /**
     * Löscht eine Beziehung aus der Datenbank.
     * @param id Die ID der zu löschenden Beziehung.
     * @return Eine Bestätigungsnachricht oder ein Fehler bei einem internen Serverfehler.
     */
    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<String> deleteBeziehung(@PathVariable Integer id) {
        try {
            beziehungsRepository.deleteById(id);
            return ResponseEntity.ok("Kontakt gelöscht");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Fehler beim Löschen des Kontakts");
        }
    }

    /**
     * Holt eine spezifische Beziehung anhand ihrer ID.
     * @param id Die ID der zu findenden Beziehung.
     * @return Die gefundene Beziehung oder ein Fehler, falls sie nicht gefunden wird.
     */
    @GetMapping(path = "/get/{id}")
    public ResponseEntity<Beziehung> getBeziehungById(@PathVariable Integer id) {
        Optional<Beziehung> beziehung = beziehungsRepository.findById(id);
        if (beziehung.isPresent()) {
            return ResponseEntity.ok(beziehung.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
