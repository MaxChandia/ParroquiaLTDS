export default function handler(req, res) {
    if (req.method === "POST") {
      const { token } = req.body;
      if (token === "tuTokenValido") { 
        return res.status(200).json({ valid: true });
      } else {
        return res.status(401).json({ valid: false });
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  