import Navigation from "./Navigation/Navigation";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
      </header>
      <hr />
      <Outlet />
    </div>
  );
}
