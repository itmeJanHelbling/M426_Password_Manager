import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import "./App.css";
import Passwort_Generator from "./pages/Passwort_Generator/Passwort_Generator";
import Passwort_Manager from "./pages/Passwort_Manager/Passwort_Manager";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Passwort_Generator />} />
        <Route path="manager" element={<Passwort_Manager />} />
      </Route>
    </Routes>
  );
}

export default App;
