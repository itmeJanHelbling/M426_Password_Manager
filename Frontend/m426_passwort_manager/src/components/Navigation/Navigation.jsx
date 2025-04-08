import { Link } from "react-router-dom";
import "./Navigation.css";
export default function Navigation() {
  return (
    <nav className="main-nav">
      <ul>
        <li>
          <Link to="/">Passwort Generator</Link>
        </li>
        <li>
          <Link to="/manager">Passwort Manager</Link>
        </li>
        <li>
          <Link to="/übersicht">Passworübersicht</Link>
        </li>
      </ul>
    </nav>
  );
}
