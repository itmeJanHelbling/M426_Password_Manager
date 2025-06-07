import { useState } from "react";
import axios from "axios";
import "./ManualSave.css";

export default function ManualSave({ fetchPasswords }) {
  const [siteName, setSiteName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  const savePassword = async () => {
    if (!password || !siteName || !username) {
      setSaveMessage("Bitte alle Felder ausfüllen!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/save", {
        name: siteName,
        username: username,
        password: password,
        createdAt: "", // Wird noch leer gelassen, weil das Backend das Attribut "created at" ausfüllt
      });
      setSiteName("");
      setUsername("");
      setPassword("");
      fetchPasswords();
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
      setSaveMessage("Fehler beim Speichern!");
    }
  };

  return (
    <>
      <div className="manual-save">
        <h3>Passwort manuell speichern</h3>
        <div className="save-form">
          <div>
            <input
              type="text"
              placeholder="Name der Website"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Benutzername / E-Mail"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
          </div>
          <button onClick={savePassword} className="save-button">
            Speichern
          </button>
          {saveMessage && <p className="save-message">{saveMessage}</p>}
        </div>
      </div>
    </>
  );
}
