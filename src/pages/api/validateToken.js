export default function handler(req, res) {
    if (req.method === "POST") {
      const { token } = req.body;
  
      // Aquí deberías implementar la validación real del token
      // Por ejemplo, usando JWT:
      // const isValid = jwt.verify(token, process.env.JWT_SECRET);
  
      if (token === "tuTokenValido") { // Simulación de un token válido
        return res.status(200).json({ valid: true });
      } else {
        return res.status(401).json({ valid: false });
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  