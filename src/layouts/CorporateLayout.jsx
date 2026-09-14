import { useState } from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function CorporateLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      { <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} /> }

      <div className="lg:pl-72">
        <Header onMenu={() => setMenuOpen(true)} />

        <main className="p-5 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
