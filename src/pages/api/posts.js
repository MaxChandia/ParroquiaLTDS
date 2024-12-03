import { prisma } from "@/prisma";
import multer from "multer";
import nextConnect from "next-connect";
import { v4 as uuidv4 } from "uuid";
import path from "path";

// Configurar multer para subir archivos
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads", // Carpeta donde se almacenan las imágenes
    filename: (req, file, cb) => {
      const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("El archivo debe ser una imagen."));
    }
  },
});

// Configuración del manejador Next.js con soporte para archivos
const handler = nextConnect({
  onError: (err, req, res) => {
    console.error(err);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  },
});

handler.use(upload.single("image"));

handler.post(async (req, res) => {
  const { title, content, authorId } = req.body;
  const slug = title.toLowerCase().replace(/\s+/g, "-");

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        slug,
        imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
        author: { connect: { id: authorId } },
      },
    });
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el post" });
  }
});

export default handler;

export const config = {
  api: {
    bodyParser: false, // Necesario para manejar archivos con multer
  },
};
