import { useState, useEffect } from "react";
import axios from "axios";
import ManualSave from "../../components/ManualSave";
import EditEntry from "../../components/EditEntry";
import "../style/PasswordApp.css";

export default function Passwort_Manager() {
  const [passwords, setPasswords] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [EditingEntry, setEditingEntry] = useState(null);

  //Beim Laden der Webseite
  useEffect(() => {
    fetchPasswords();
  }, []);

  //Passwörter abfragen
  const fetchPasswords = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/passwords/");
      setPasswords(response.data);
    } catch (error) {
      console.error("Fehler beim Abrufen der Passwörter:", error);
    }
  };

  //Handler für mein Edit Fenster
  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setIsEditing(true);
  };

  //Handler für das Speichern der Änderungen
  const handleSave = async (updatedEntry) => {
    await axios.put(
      `http://localhost:8080/api/passwords/${updatedEntry.id}`,
      updatedEntry
    );
    setPasswords((prevPasswords) =>
      prevPasswords.map((entry) =>
        entry.id === updatedEntry.id ? updatedEntry : entry
      )
    );
    setIsEditing(false);
  };

  //Handler für das Löschen von einem Eintrag
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/passwords/${id}`);
    setPasswords((prevPasswords) =>
      prevPasswords.filter((entry) => entry.id !== id)
    );
  };

  //Handler für das Schliessen des Edit Fensters
  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="password-manager">
      <h1>Passwort Manager</h1>
      <table>
        <thead>
          <tr>
            <th>Adresse</th>
            <th>Benutzername/E-Mail</th>
            <th>Passwort</th>
          </tr>
        </thead>
        <tbody>
          {passwords.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.name}</td>
              <td>{entry.username}</td>
              <td>{entry.password}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEdit(entry)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(entry.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditing && (
        <EditEntry
          entry={EditingEntry}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={handleCloseEdit}
        />
      )}
      <div>
        <ManualSave fetchPasswords={fetchPasswords} />
      </div>
    </div>
  );
}
