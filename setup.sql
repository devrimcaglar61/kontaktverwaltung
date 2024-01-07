-- Erstelle die Datenbank
CREATE DATABASE kontaktverwaltung;

-- Erstelle den Benutzer
CREATE USER 'Admin'@'localhost' IDENTIFIED BY 'deve9';

-- Gewähre alle Berechtigungen auf die Datenbank 'kontaktverwaltung'
GRANT ALL PRIVILEGES ON kontaktverwaltung.* TO 'Admin'@'localhost';

-- Übernehme die Änderungen
FLUSH PRIVILEGES;
