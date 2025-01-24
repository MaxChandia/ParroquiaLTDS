import { prisma } from "@prisma"; // Asegúrate de que Prisma esté configurado correctamente

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { user, password } = req.body || {}; // Asegúrate de que req.body sea un objeto

    if (!user || !password) {
      return res.status(400).json({ error: "Datos incompletos" });
    }

    try {
      // Busca por el campo `user`, que es el nombre de usuario en tu base de datos
      const userData = await prisma.user.findUnique({
        where: { user }, // Aquí buscamos por el nombre de usuario
      });

      // Verifica si el usuario existe y la contraseña es correcta
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
