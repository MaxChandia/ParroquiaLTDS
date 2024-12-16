import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token"); // Usa cookies si deseas una solución más segura
  const url = req.nextUrl.clone();

  // Redirigir a login si el token no está presente
  if (!token && url.pathname === "/nuevanoticia") {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Configurar las rutas protegidas
export const config = {
  matcher: ["/nuevanoticia"], // Agrega más rutas protegidas si es necesario
};
