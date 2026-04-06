
const apiUrl = process.env.NEXT_PUBLIC_API_URL;


export const getNewsService = async() =>{
    const response = await fetch(`${apiUrl}/post`);
    if (!response.ok) {
        throw new Error("Error al obtener las noticias");
    }
    const data = await response.json();
    return data;
}

export const createPost = async (formData: FormData, token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    body: formData,
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("No estás autorizado. Por favor, inicia sesión.");
    } else if (response.status === 409) {
    throw new Error("Ya existe un post con ese título. Por favor, elige otro título.");
    } else {
      throw new Error("Error al crear el post");
    }
  }
  
  const data = await response.json();
  return data;
};

export const deletePost = async (id: string, token: string) => {
    const response = await fetch(`${apiUrl}/post/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error("Error al eliminar el post");
    }
    const data = await response.text();
    return data;
}

