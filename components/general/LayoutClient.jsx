"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NavegacionComponent from "@/components/ui/Navegacion";
import FooterComponent from "@/components/ui/Footer";
import { ClientProvider } from "@/app/ClientProvider";

function LayoutClient({ children }) {
  const pathname = usePathname();
  const hiddenRoutes = ["/login"];
  const hide = hiddenRoutes.includes(pathname);

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetch("/api/session")
      .then((r) => r.json())
      .then((d) => {
        if (mounted) setIsAuth(Boolean(d.authenticated));
      })
      .catch(() => {
        if (mounted) setIsAuth(false);
      });
    return () => { mounted = false; };
  }, []);

  return (
    <>
      {!hide && <NavegacionComponent showAuthButtons={!isAuth} />}
      <ClientProvider>{children}</ClientProvider>
      {!hide && <FooterComponent />}
    </>
  );
}

export default LayoutClient;
