import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Kontaktverwaltung
          </Link>
          <button className="navbar-toggler" type="button"></button>
          <Link className="btn btn-outline-light" to="/addrelation">
            Beziehung hinzufügen
          </Link>
          <Link className="btn btn-outline-light" to="/addcontact">
            Kontakt hinzufügen
          </Link>
        </div>
      </nav>
    </div>
  );
}
