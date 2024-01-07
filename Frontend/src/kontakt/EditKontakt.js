import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditKontakt() {
  let navigate = useNavigate();
  const { id } = useParams();

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

  const [relations, setRelations] = useState([]);

  useEffect(() => {
    const fetchContactData = async () => {
      const response = await fetch(
        `http://localhost:8080/api/v1/kontakt/get/${id}`
      );
      const data = await response.json();
      setContact(data);
    };

    const fetchRelations = async () => {
      const response = await fetch(
        'http://localhost:8080/api/v1/beziehung/getAll'
      );
      const data = await response.json();
      setRelations(data);
    };

    if (id) {
      fetchContactData();
      fetchRelations();
    }
  }, [id]);

  const onInputChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
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

  const formData = new FormData();
  formData.append('vorname', vorname);
  formData.append('nachname', nachname);
  formData.append('adresse', adresse);
  formData.append('plz', plz);
  formData.append('ort', ort);
  formData.append('email', email);
  formData.append('telefon_nummer', telefon_nummer);
  formData.append('beziehung_id', beziehung_id);

  const onSubmit = async (e) => {
    e.preventDefault();

    await fetch(`http://localhost:8080/api/v1/kontakt/update/${id}`, {
      method: 'PUT',
      body: formData,
    });
    navigate('/');
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Contact</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="vorname" className="form-label">
                Vorname
              </label>
              <input
                type={'text'}
                className="form-control"
                placeholder="Vorname eingeben"
                name="vorname"
                value={vorname}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Nachname" className="form-label">
                Nachname
              </label>
              <input
                type={'text'}
                className="form-control"
                placeholder="Nachname eingeben"
                name="nachname"
                value={nachname}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Adresse" className="form-label">
                Adresse
              </label>
              <input
                type={'text'}
                className="form-control"
                placeholder="Adresse eingeben"
                name="adresse"
                value={adresse}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="PLZ" className="form-label">
                PLZ
              </label>
              <input
                type={'text'}
                className="form-control"
                placeholder="PLZ eingeben"
                name="plz"
                value={plz}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Ort" className="form-label">
                Ort
              </label>
              <input
                type={'text'}
                className="form-control"
                placeholder="Ort eingeben"
                name="ort"
                value={ort}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input
                type={'text'}
                className="form-control"
                placeholder="Email eingeben"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Telefon" className="form-label">
                Telefon
              </label>
              <input
                type={'text'}
                className="form-control"
                placeholder="Telefon eingeben"
                name="telefon_nummer"
                value={telefon_nummer}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="beziehung_id" className="form-label">
                Beziehung
              </label>
              <select
                className="form-control"
                name="beziehung_id"
                value={beziehung_id}
                onChange={onInputChange}
              >
                <option value="">Bitte Beziehung wählen</option>
                {relations.map((relation) => (
                  <option key={relation.id} value={relation.id}>
                    {relation.bezeichnung}
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
