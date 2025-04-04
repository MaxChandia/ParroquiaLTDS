import { prisma } from "@/lib/prisma";


export default async function handler(req, res) {
  if (req.method === "POST") {
    const { user, password } = req.body || {}; 

    if (!user || !password) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    try {
      const userData = await prisma.user.findUnique({
        where: { user }, 
      });
      if (userData && userData.password === password) {
        res.status(200).json({ user: userData });
      } else {
        res.status(401).json({ error: "Credenciales inválidas" });
      }
    } catch (error) {
      console.error("Error del servidor:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
