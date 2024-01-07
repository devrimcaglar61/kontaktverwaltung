import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditRelation() {
  // Um nach dem Absenden auf die Startseite zu kommen wir unten eingesetzt
  let navigate = useNavigate();

  const { id } = useParams();

  const [relation, setRelation] = useState({
    bezeichnung: '',
  });

  const { bezeichnung } = relation;

  const onInputChange = (e) => {
    setRelation({ ...relation, [e.target.name]: e.target.value });
  };

  const formData = new FormData();
  formData.append('bezeichnung', bezeichnung);

  useEffect(() => {
    const fetchRelationData = async () => {
      const response = await fetch(
        `http://localhost:8080/api/v1/beziehung/get/${id}`
      );
      const data = await response.json();
      setRelation(data);
    };
    if (id) {
      fetchRelationData();
    }
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:8080/api/v1/beziehung/update/${id}`, {
      method: 'PUT',
      body: formData,
    });
    navigate('/');
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Relation</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="beziehung" className="form-label">
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
