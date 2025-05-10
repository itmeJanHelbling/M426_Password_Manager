import { useState } from "react";

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
    <div className="edit-entry">
      <h2>Eintrag anpassen</h2>
      <div>
        <label>Name der Webseite: </label>
        <input
          className="input-edit"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Benutername/Email: </label>
        <input
          className="input-edit"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Passwort: </label>
        <input
          className="input-edit"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="actions">
        <button className="save-button" onClick={handleSave}>
          Speichern
        </button>
        <button className="delete-button" onClick={handleDelete}>
          Löschen
        </button>
        <button className="close-button" onClick={onClose}>
          Schliessen
        </button>
      </div>
    </div>
  );
}
