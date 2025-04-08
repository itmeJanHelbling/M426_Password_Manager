import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import "./App.css";
import Passwort_Generator from "./pages/Passwort_Generator/Passwort_Generator";
import Passwort_Manager from "./pages/Passwort_Manager";
import Passwort_Übersicht from "./pages/Passwort_Übersicht";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Passwort_Generator />} />
        <Route path="manager" element={<Passwort_Manager />} />
        <Route path="übersicht" element={<Passwort_Übersicht />} />
      </Route>
    </Routes>
  );
}

export default App;
