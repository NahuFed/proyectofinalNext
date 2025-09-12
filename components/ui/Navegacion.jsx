"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Film, Menu, X } from "lucide-react";

const NavegacionComponent = ({ showAuthButtons = true }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
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

          <div className="hidden md:flex items-center space-x-4">
            {showAuthButtons ? (
              <>
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
              </>
            ) : (
              <Link
                href="/logout"
                className="px-4 py-2 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors text-red-600"
              >
                Cerrar sesión
              </Link>
            )}
          </div>

          <button
            className="md:hidden p-2 text-foreground hover:text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-border bg-card/90 backdrop-blur-sm px-4 py-4 space-y-4">
          <Link
            href="/movies"
            className="block text-foreground hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Películas
          </Link>
          <Link
            href="/rankings"
            className="block text-foreground hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Rankings
          </Link>
          <Link
            href="/profile"
            className="block text-foreground hover:text-primary transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Mi Perfil
          </Link>

          {showAuthButtons ? (
            <div className="space-y-2">
              <Link
                href="/login"
                className="block px-4 py-2 rounded-md text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/register"
                className="block px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Registrarse
              </Link>
            </div>
          ) : (
            <div className="space-y-2 ">
              <Link
                href="/logout"
                className="block px-4 py-2 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors text-red-600"
                onClick={() => setIsOpen(false)}
              >
                Cerrar sesión
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavegacionComponent;
