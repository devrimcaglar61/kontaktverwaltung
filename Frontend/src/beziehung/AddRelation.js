import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Komponente zum Hinzufügen einer neuen Beziehung.
 * Ermöglicht es dem Benutzer, eine Beziehung über ein Formular hinzuzufügen.
 */
export default function AddRelation() {
  // Hook zum Navigieren nach dem Absenden des Formulars
  let navigate = useNavigate();

  // State für die Beziehung
  const [relation, setRelation] = useState({
    bezeichnung: '',
  });

  // Extrahieren von 'bezeichnung' aus dem relation-State
  const { bezeichnung } = relation;

  // Funktion zum Aktualisieren des State bei Änderungen im Eingabefeld
  const onInputChange = (e) => {
    setRelation({ ...relation, [e.target.name]: e.target.value });
  };

  // FormData-Objekt für das POST-Request
  const formData = new FormData();
  formData.append('bezeichnung', bezeichnung);

  // Funktion zum Behandeln des Formular-Submit
  const onSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:8080/api/v1/beziehung/add', {
      method: 'POST',
      body: formData,
    });
    navigate('/'); // Navigiere zur Startseite nach dem Absenden
  };

  // Render-Methode für die Komponente
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Beziehung Hinzufügen</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="bezeichnung" className="form-label">
                Beziehung
              </label>
              <input
                type={'text'}
                className="form-control"
                placeholder="Bezeichnung der Beziehung eingeben"
                name="bezeichnung"
                value={bezeichnung}
                onChange={(e) => onInputChange(e)}
              />
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
