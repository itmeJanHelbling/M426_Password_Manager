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
      <h2>Edit Entry</h2>
      <div>
        <label>Site Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="actions">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
