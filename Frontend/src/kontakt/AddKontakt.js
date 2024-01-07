import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AddContacts() {
  // Um nach dem Absenden auf die Startseite zu kommen wir unten eingesetzt
  let navigate = useNavigate();

  const [contact, setContact] = useState({
    vorname: '',
    nachname: '',
    adresse: '',
    plz: '',
    ort: '',
    email: '',
    telefon_nummer: '',
    beziehung_id: '',
  });

  const [relation, setRelation] = useState([]);

  const [errors, setErrors] = useState({});
  const validate = () => {
    let tempErrors = {};
    if (contact.vorname.length < 2 || contact.vorname.length > 50) {
      tempErrors.vorname = 'Vorname muss zwischen 2 und 50 Zeichen lang sein';
    }
    if (contact.nachname.length < 2 || contact.nachname.length > 50) {
      tempErrors.nachname = 'Nachname muss zwischen 2 und 50 Zeichen lang sein';
    }
    if (contact.adresse.length < 10 || contact.adresse.length > 100) {
      tempErrors.adresse = 'Adresse muss zwischen 10 und 100 Zeichen lang sein';
    }
    if (!contact.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) {
      tempErrors.email = 'Ungültiges Email-Format';
    }
    if (
      contact.telefon_nummer.length < 5 ||
      contact.telefon_nummer.length > 20
    ) {
      tempErrors.telefon_nummer =
        'Telefonnummer muss zwischen 5 und 20 Zeichen lang sein';
    }
    if (!contact.ort.trim()) {
      tempErrors.ort = 'Ort darf nicht leer sein';
    } else if (contact.ort.length < 5 || contact.ort.length > 50) {
      tempErrors.ort = 'Ort muss zwischen 5 und 50 Zeichen lang sein';
    }

    if (!contact.plz.trim()) {
      tempErrors.plz = 'PLZ darf nicht leer sein';
    } else if (!/^\d{4}$/.test(contact.plz)) {
      tempErrors.plz = 'PLZ muss eine 4-stellige Zahl sein';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const {
    vorname,
    nachname,
    adresse,
    plz,
    ort,
    email,
    telefon_nummer,
    beziehung_id,
  } = contact;

  const onInputChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchBeziehungen = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/api/v1/beziehung/getAll'
        );

        const data = await response.json();
        setRelation(data);
      } catch (error) {
        console.error('Fehler beim Abrufen der Beziehungen:', error);
      }
    };

    fetchBeziehungen();
  }, []);

  const formData = new FormData();
  formData.append('vorname', vorname);
  formData.append('nachname', nachname);
  formData.append('adresse', adresse);
  formData.append('plz', plz);
  formData.append('ort', ort);
  formData.append('email', email);
  formData.append('telefon_nummer', telefon_nummer);
  formData.append('beziehung', beziehung_id);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await fetch('http://localhost:8080/api/v1/kontakt/add', {
      method: 'POST',
      body: formData,
    });
    navigate('/');
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Kontakt Hinzufügen</h2>

          <form onSubmit={onSubmit}>
            {/* Vorname */}
            <div className="mb-3">
              <label htmlFor="vorname" className="form-label">
                Vorname*
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Vorname eingeben"
                name="vorname"
                value={vorname}
                onChange={onInputChange}
              />
              {errors.vorname && (
                <p className="text-danger">{errors.vorname}</p>
              )}
            </div>

            {/* Nachname */}
            <div className="mb-3">
              <label htmlFor="nachname" className="form-label">
                Nachname*
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Nachname eingeben"
                name="nachname"
                value={nachname}
                onChange={onInputChange}
              />
              {errors.nachname && (
                <p className="text-danger">{errors.nachname}</p>
              )}
            </div>

            {/* Adresse */}
            <div className="mb-3">
              <label htmlFor="adresse" className="form-label">
                Adresse
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Adresse eingeben"
                name="adresse"
                value={adresse}
                onChange={onInputChange}
              />
              {errors.adresse && (
                <p className="text-danger">{errors.adresse}</p>
              )}
            </div>

            {/* PLZ */}
            <div className="mb-3">
              <label htmlFor="plz" className="form-label">
                PLZ*
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="PLZ eingeben"
                name="plz"
                value={plz}
                onChange={onInputChange}
              />
              {errors.plz && <p className="text-danger">{errors.plz}</p>}
            </div>

            {/* Ort */}
            <div className="mb-3">
              <label htmlFor="ort" className="form-label">
                Ort*
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Ort eingeben"
                name="ort"
                value={ort}
                onChange={onInputChange}
              />
              {errors.ort && <p className="text-danger">{errors.ort}</p>}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email*
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Email eingeben"
                name="email"
                value={email}
                onChange={onInputChange}
              />
              {errors.email && <p className="text-danger">{errors.email}</p>}
            </div>

            {/* Telefonnummer */}
            <div className="mb-3">
              <label htmlFor="telefon_nummer" className="form-label">
                Telefon*
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Telefon eingeben"
                name="telefon_nummer"
                value={telefon_nummer}
                onChange={onInputChange}
              />
              {errors.telefon_nummer && (
                <p className="text-danger">{errors.telefon_nummer}</p>
              )}
            </div>
            {/* Beziehung */}
            <div className="mb-3">
              <select
                className="form-control"
                name="beziehung_id"
                value={beziehung_id}
                onChange={onInputChange}
              >
                <option value="">Bitte Beziehung wählen</option>
                {relation.map((beziehung) => (
                  <option key={beziehung.id} value={beziehung.id}>
                    {beziehung.bezeichnung}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Absenden
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Abbrechen
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
