import { useState } from "react";
import axios from "axios"; // Importiere axios

export default function Passwort_Generator() {
  const [password, setPassword] = useState("");

  //Passwort generieren
  const generatePassword = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/generate"); // Axios GET-Request
      setPassword(response.data); // Setze das Passwort aus der Antwort
    } catch (error) {
      console.error("Fehler beim Generieren:", error);
    }
  };

  //Passwort kopieren
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <>
      <div className="password-generator">
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
      </div>
    </>
  );
}
