import { useState } from "react";
import "./EditEntry.css";

export default function EditEntry({ entry, onSave, onDelete, onClose }) {
  const [name, setName] = useState(entry.name);
  const [username, setUsername] = useState(entry.username);
  const [password, setPassword] = useState(entry.password);

  const handleSave = () => {
    const updatedEntry = { ...entry, name, username, password };
    onSave(updatedEntry);
  };

  const handleDelete = () => {
    onDelete(entry.id);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Eintrag anpassen</h2>
        <div className="all-inputs">
          <div className="input">
            <label>Name der Webseite: </label>
            <input
              className="input-edit"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input">
            <label>Benutername/Email: </label>
            <input
              className="input-edit"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input">
            <label>Passwort: </label>
            <input
              className="input-edit"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="actions">
          <button className="save-button" onClick={handleSave}>
            Speichern
          </button>
          <button className="close-button" onClick={onClose}>
            Schliessen
          </button>
        </div>
      </div>
    </div>
  );
}
