import { useState } from "react";
import axios from "axios";

export default function Passwort_Generator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [numbersOption, setNumbersOption] = useState("1"); // 0=nein, 1=ja, 2=extra
  const [specialCharsOption, setSpecialCharsOption] = useState("1"); // 0=nein, 1=ja, 2=extra

  const generatePassword = async () => {
    try {
      // Umwandlung der Radiobutton-Werte in booleans für das Backend
      const includeNumbers = numbersOption !== "0";
      const includeSpecialChars = specialCharsOption !== "0";
      
      // Extra Zahlen/Sonderzeichen können hier implementiert werden
      const response = await axios.get("http://localhost:8080/api/generate", {
        params: {
          length,
          includeNumbers,
          includeSpecialChars
        }
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
                value="0"
                checked={numbersOption === "0"}
                onChange={(e) => setNumbersOption(e.target.value)}
              />
              0 (keine)
            </label>
            <label>
              <input
                type="radio"
                name="numbers"
                value="1"
                checked={numbersOption === "1"}
                onChange={(e) => setNumbersOption(e.target.value)}
              />
              1 (normal)
            </label>
            <label>
              <input
                type="radio"
                name="numbers"
                value="2"
                checked={numbersOption === "2"}
                onChange={(e) => setNumbersOption(e.target.value)}
              />
              2 (extra)
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
                value="0"
                checked={specialCharsOption === "0"}
                onChange={(e) => setSpecialCharsOption(e.target.value)}
              />
              0 (keine)
            </label>
            <label>
              <input
                type="radio"
                name="specialChars"
                value="1"
                checked={specialCharsOption === "1"}
                onChange={(e) => setSpecialCharsOption(e.target.value)}
              />
              1 (normal)
            </label>
            <label>
              <input
                type="radio"
                name="specialChars"
                value="2"
                checked={specialCharsOption === "2"}
                onChange={(e) => setSpecialCharsOption(e.target.value)}
              />
              2 (extra)
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
    </div>
  );
}