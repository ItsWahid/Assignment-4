import { Menu, X } from "lucide-react";
import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import Footer from "./components/Footer";


export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Define your nav links in one place
  const navLinks = [
    { path: "/", label: "All Books" },
    { path: "/add-book", label: "Add Book" },
    { path: "/borrow-summary", label: "Borrow Summary" },
  ];

  return (
    <section className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-bold">📚 Library System</div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 text-lg">
              {navLinks.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    isActive ? "text-red-400" : "hover:text-gray-200"
                  }
                >
                  {label}
                </NavLink>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded hover:bg-blue-500 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden flex flex-col space-y-3 pb-4 text-lg">
              {navLinks.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    isActive ? "text-red-400" : "hover:text-gray-200"
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-20 pb-16">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </section>
  );
}

