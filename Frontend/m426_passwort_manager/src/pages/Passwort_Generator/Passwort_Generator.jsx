import { useState } from "react";
import axios from "axios";
import "../style/PasswordApp.css";


export default function Passwort_Generator() {
  // Globale Variablen
  const [password, setPassword] = useState("");

  //Passwort generieren
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true);

  const generatePassword = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/generate", {
        params: {
          length,
          includeNumbers,
          includeSpecialChars,
        },
      });
      setPassword(response.data);
    } catch (error) {
      console.error("Fehler beim Generieren:", error);
      setPassword("Fehler beim Generieren des Passworts");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  //Passwort speichern
  const [siteName, setSiteName] = useState("");
  const [username, setUsername] = useState("");
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
      setSaveMessage(response.data); // response like "Gespeichert!"
      setSiteName("");
      setUsername("");
    } catch (error) {
      console.error("Fehler beim Speichern:", error);
      setSaveMessage("Fehler beim Speichern!");
    }
  };
  return (
    <div className="password-generator">
      <div className="options">
        <div className="option-group">
          <label>Länge:</label>
          <select
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
          >
            <option value={8}>8</option>
            <option value={12}>12</option>
            <option value={16}>16</option>
          </select>
        </div>

        <div className="option-group">
          <label>Zahlen:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="numbers"
                value="true"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers(true)}
              />
              Ja
            </label>
            <label>
              <input
                type="radio"
                name="numbers"
                value="false"
                checked={!includeNumbers}
                onChange={() => setIncludeNumbers(false)}
              />
              Nein
            </label>
          </div>
        </div>

        <div className="option-group">
          <label>Sonderzeichen:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="specialChars"
                value="true"
                checked={includeSpecialChars}
                onChange={() => setIncludeSpecialChars(true)}
              />
              Ja
            </label>
            <label>
              <input
                type="radio"
                name="specialChars"
                value="false"
                checked={!includeSpecialChars}
                onChange={() => setIncludeSpecialChars(false)}
              />
              Nein
            </label>
          </div>
        </div>
      </div>

      <button onClick={generatePassword} className="generate-button">
        Passwort generieren
      </button>

      {password && (
        <div className="password-display">
          <input
            type="text"
            value={password}
            readOnly
            className="password-input"
          />
          <button onClick={copyToClipboard} className="copy-button">
            Kopieren
          </button>
        </div>
      )}
      <div>
        {password && (
          <div className="save-form">
            <h3>Passwort speichern</h3>
            <input
              type="text"
              placeholder="Name der Website"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="input"
            />
            <input
              type="text"
              placeholder="Benutzername / E-Mail"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
            />
            <button onClick={savePassword} className="save-button">
              Speichern
            </button>
            {saveMessage && <p className="save-message">{saveMessage}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
