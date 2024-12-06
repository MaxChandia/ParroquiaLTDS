import { v2 as cloudinary } from "cloudinary";

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: "dqp4mnozy", // Reemplaza con tu cloud_name
  api_key: "341968887157697",       // Reemplaza con tu API_KEY
  api_secret: "BObg0rObw-YQ8TqlvNcI1ruEwuY", // Reemplaza con tu API_SECRET
});

export default cloudinary;