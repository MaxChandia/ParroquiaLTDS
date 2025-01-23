// src/app/editar/[slug]/noticiaServer.tsx

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getNoticiaBySlug(slug: string) {
  const noticia = await prisma.post.findUnique({
    where: { slug },
  });

  return noticia;
}
