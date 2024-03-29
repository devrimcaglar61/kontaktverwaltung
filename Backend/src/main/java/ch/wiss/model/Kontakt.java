package ch.wiss.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

/**
 * Entity-Klasse für Kontakt.
 * Stellt einen Kontakt in der Datenbank dar.
 */
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Kontakt {
    /**
     * Eindeutige ID für den Kontakt.
     * Wird automatisch von der Datenbank generiert.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * Vorname des Kontakts.
     * Darf nicht leer sein und muss zwischen 2 und 50 Zeichen lang sein.
     */
    @NotBlank(message = "Vorname darf nicht leer sein")
    @Size(min = 2, max = 50, message = "Vorname muss zwischen 2 und 50 Zeichen lang sein")
    private String vorname;

    /**
     * Nachname des Kontakts.
     * Darf nicht leer sein und muss zwischen 2 und 50 Zeichen lang sein.
     */
    @NotBlank(message = "Nachname darf nicht leer sein")
    @Size(min = 2, max = 50, message = "Nachname muss zwischen 2 und 50 Zeichen lang sein")
    private String nachname;

    /**
     * Adresse des Kontakts.
     * Darf nicht null sein und muss zwischen 5 und 100 Zeichen lang sein.
     */
    @NotNull(message = "Adresse darf nicht null sein")
    @Size(min = 5, max = 100, message = "Adresse muss zwischen 5 und 100 Zeichen lang sein")
    private String adresse;

    /**
     * Postleitzahl des Kontakts.
     * Muss eine gültige vierstellige Zahl sein.
     */
    @NotNull(message = "PLZ darf nicht null sein")
    @Digits(integer = 4, fraction = 0, message = "PLZ muss eine gültige Zahl sein")
    private Long plz;

    /**
     * Ort des Kontakts.
     * Darf nicht null sein und muss zwischen 5 und 50 Zeichen lang sein.
     */
    @NotNull(message = "Ort darf nicht null sein")
    @Size(min = 5, max = 50, message = "Ort muss zwischen 5 und 50 Zeichen lang sein")
    private String ort;

    /**
     * E-Mail-Adresse des Kontakts.
     * Muss einem gültigen E-Mail-Format entsprechen.
     */
    @NotBlank(message = "Email darf nicht leer sein")
    @Email(message = "Ungültiges Email-Format")
    private String email;

    /**
     * Telefonnummer des Kontakts.
     * Darf zwischen 5 und 20 Zeichen lang sein.
     */
    @Size(min = 5, max = 20, message = "Telefonnummer darf maximal 20 Zeichen lang sein")
    private String telefon_nummer;

    /**
     * Beziehung des Kontakts.
     * Verweist auf eine Beziehung-Entity.
     */
    @OneToOne
    @JoinColumn(name = "beziehung_id", referencedColumnName = "id")
    private Beziehung beziehung_id;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getVorname() {
		return vorname;
	}

	public void setVorname(String vorname) {
		this.vorname = vorname;
	}

	public String getNachname() {
		return nachname;
	}

	public void setNachname(String nachname) {
		this.nachname = nachname;
	}

	public String getAdresse() {
		return adresse;
	}

	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}

	public Long getPlz() {
		return plz;
	}

	public void setPlz(Long plz) {
		this.plz = plz;
	}

	public String getOrt() {
		return ort;
	}

	public void setOrt(String ort) {
		this.ort = ort;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelefon_nummer() {
		return telefon_nummer;
	}

	public void setTelefon_nummer(String telefon_nummer) {
		this.telefon_nummer = telefon_nummer;
	}

	public Beziehung getBeziehung_id() {
		return beziehung_id;
	}

	public void setBeziehung_id(Beziehung beziehung_id) {
		this.beziehung_id = beziehung_id;
	}
    
    
    
}
