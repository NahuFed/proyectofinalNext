"use client";

import { usePathname } from "next/navigation";
import NavegacionComponent from "@/components/ui/Navegacion";
import FooterComponent from "@/components/ui/Footer";
import { ClientProvider } from "@/app/ClientProvider";

 function LayoutClient({ children }) {
  const pathname = usePathname();
  const hiddenRoutes = ["/login"]; 
  const hide = hiddenRoutes.includes(pathname);

  return (
    <>
      {!hide && <NavegacionComponent />}
      <ClientProvider>{children}</ClientProvider>
      {!hide && <FooterComponent />}
    </>
  );
}
 export default LayoutClient;