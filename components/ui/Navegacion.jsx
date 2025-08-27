import Link from "next/link";
import React from "react";
import { Film } from "lucide-react";

const NavegacionComponent = ({ mostrarBotonesAuth = true }) => {
  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Film className="h-8 w-8 text-primary" />
            <h1
              className="text-2xl font-black text-foreground"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              CineReview
            </h1>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/movies"
              className="text-foreground hover:text-primary transition-colors"
            >
              Películas
            </Link>
            <Link
              href="/rankings"
              className="text-foreground hover:text-primary transition-colors"
            >
              Rankings
            </Link>
            <Link
              href="/profile"
              className="text-foreground hover:text-primary transition-colors"
            >
              Mi Perfil
            </Link>
          </div>

          {mostrarBotonesAuth && (
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="px-4 py-2 rounded-md text-foreground hover:text-primary transition-colors"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavegacionComponent;
