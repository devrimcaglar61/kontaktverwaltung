import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [relations, setRelations] = useState([]);
  const getContacts = async () => {
    const response = await fetch('http://localhost:8080/api/v1/kontakt/getAll');
    const contacts = await response.json();
    setContacts(contacts);
    console.log(contacts);
  };

  const deleteContact = async (id) => {
    await fetch(`http://localhost:8080/api/v1/kontakt/delete/${id}`, {
      method: 'DELETE',
    });
    getContacts();
  };

  const getRelation = async () => {
    const response = await fetch(
      'http://localhost:8080/api/v1/beziehung/getAll'
    );
    const relations = await response.json();
    setRelations(relations);
  };

  const deleteRelation = async (id) => {
    await fetch(`http://localhost:8080/api/v1/beziehung/delete/${id}`, {
      method: 'DELETE',
    });
    getRelation();
  };

  useEffect(() => {
    getContacts();
    getRelation();
  }, []);

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Vorname</th>
              <th scope="col">Nachname</th>
              <th scope="col">Adresse</th>
              <th scope="col">PLZ</th>
              <th scope="col">Ort</th>
              <th scope="col">Email</th>
              <th scope="col">Telefon</th>
              <th scope="col">Beziehung</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={contact.id}>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{contact.vorname}</td>
                <td>{contact.nachname}</td>
                <td>{contact.adresse}</td>
                <td>{contact.plz}</td>
                <td>{contact.ort}</td>
                <td>{contact.email}</td>
                <td>{contact.telefon_nummer}</td>
                <td>{contact.beziehung_id?.bezeichnung}</td>
                <td>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editcontact/${contact.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteContact(contact.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="py-4">
        <table className="table border shadow smallTable">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Bezeichnung</th>
            </tr>
          </thead>
          <tbody>
            {relations.map((relation, index) => (
              <tr key={relation.id}>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{relation.bezeichnung}</td>
                <td>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editrelation/${relation.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteRelation(relation.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
