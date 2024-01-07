package ch.wiss.controller;

import ch.wiss.model.Beziehung;
import ch.wiss.model.Kontakt;
import ch.wiss.repository.KontaktRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

/**
 * Controller für Kontakt-Operationen.
 * Erlaubt das CRUD-Management von Kontakten.
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "/api/v1/kontakt")
@AllArgsConstructor
public class KontaktController {

    @Autowired
    private KontaktRepository kontaktRepository;

    /**
     * Holt alle Kontakte aus der Datenbank.
     * @return Eine Liste von Kontakten.
     */
    @GetMapping("/getAll")
    public ResponseEntity<Iterable<Kontakt>> getAllKontakt() {
        Iterable<Kontakt> kontakte = null;
        try {
            kontakte = kontaktRepository.findAll();
        } catch (Exception e) {
            System.out.println("Kontakte wurden nicht gefunden!");
        }
        return ResponseEntity.ok(kontakte);
    }

    /**
     * Fügt einen neuen Kontakt in die Datenbank hinzu.
     * @param vorname, nachname, adresse, plz, ort, email, telefon_nummer, beziehung_id Die Daten des neuen Kontakts.
     * @return Eine Bestätigungsnachricht.
     */
    @PostMapping(path = "/add")
    public ResponseEntity<String> addNewKontakt(@RequestParam String vorname,
                                                @RequestParam String nachname,
                                                @RequestParam String adresse,
                                                @RequestParam Long plz,
                                                @RequestParam String ort,
                                                @RequestParam String email,
                                                @RequestParam String telefon_nummer,
                                                @RequestParam (required = false) Beziehung beziehung_id) {
        Kontakt kontakt = new Kontakt();
        kontakt.setVorname(vorname);
        kontakt.setNachname(nachname);
        kontakt.setAdresse(adresse);
        kontakt.setPlz(plz);
        kontakt.setOrt(ort);
        kontakt.setEmail(email);
        kontakt.setTelefon_nummer(telefon_nummer);
        kontakt.setBeziehung_id(beziehung_id);
        try {
            kontaktRepository.save(kontakt);
        } catch (Exception e) {
            System.out.println("Fehler beim Speichern des Kontakts: " + e.getMessage());
        }
        return ResponseEntity.ok("Kontakt gespeichert");
    }

    /**
     * Aktualisiert einen vorhandenen Kontakt in der Datenbank.
     * @param id Die ID des zu aktualisierenden Kontakts.
     * @param vorname, nachname, adresse, plz, ort, email, telefon_nummer, beziehung_id Die aktualisierten Daten des Kontakts.
     * @return Eine Bestätigungsnachricht oder ein Fehler, falls der Kontakt nicht gefunden wird.
     */
    @PutMapping(path = "/update/{id}")
    public ResponseEntity<String> updateKontakt(@PathVariable Integer id,
                                                @RequestParam(required = false) String vorname,
                                                @RequestParam(required = false) String nachname,
                                                @RequestParam(required = false) String adresse,
                                                @RequestParam(required = false) Long plz,
                                                @RequestParam(required = false) String ort,
                                                @RequestParam(required = false) String email,
                                                @RequestParam(required = false) String telefon_nummer,
                                                @RequestParam(required = false) Beziehung beziehung_id) {
        Optional<Kontakt> kontaktData = kontaktRepository.findById(id);
        if (kontaktData.isPresent()) {
            Kontakt kontakt = kontaktData.get();

            if (vorname != null) kontakt.setVorname(vorname);
            if (nachname != null) kontakt.setNachname(nachname);
            if (adresse != null) kontakt.setAdresse(adresse);
            if (plz != null) kontakt.setPlz(plz);
            if (ort != null) kontakt.setOrt(ort);
            if (email != null) kontakt.setEmail(email);
            if (telefon_nummer != null) kontakt.setTelefon_nummer(telefon_nummer);
            if (beziehung_id != null) kontakt.setBeziehung_id(beziehung_id);

            kontaktRepository.save(kontakt);
            return ResponseEntity.ok("Kontakt aktualisiert");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Kontakt nicht gefunden");
        }
    }

    /**
     * Löscht einen Kontakt aus der Datenbank.
     * @param id Die ID des zu löschenden Kontakts.
     * @return Eine Bestätigungsnachricht oder ein Fehler bei einem internen Serverfehler.
     */
    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<String> deleteKontakt(@PathVariable Integer id) {
        try {
            kontaktRepository.deleteById(id);
            return ResponseEntity.ok("Kontakt gelöscht");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Fehler beim Löschen des Kontakts");
        }
    }

    /**
     * Holt einen spezifischen Kontakt anhand seiner ID.
     * @param id Die ID des zu findenden Kontakts.
     * @return Der gefundene Kontakt oder ein Fehler, falls er nicht gefunden wird.
     */
    @GetMapping(path = "/get/{id}")
    public ResponseEntity<Kontakt> getKontaktById(@PathVariable Integer id) {
        Optional<Kontakt> kontaktData = kontaktRepository.findById(id);
        if (kontaktData.isPresent()) {
            return ResponseEntity.ok(kontaktData.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
