export const uploadToCloudinary = async (pics) => {
  if (pics) {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "instagram"); // Asegúrate de que este preset sea correcto y sin restricciones excesivas
    data.append("cloud_name", "dkhstgyys"); // Asegúrate de que tu cloud_name sea correcto

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dkhstgyys/image/upload", {
        method: "post",
        body: data,
      });

      // Verificar si la respuesta fue exitosa (código de estado 200-299)
      if (!res.ok) {
        const errorText = await res.text(); // Intenta leer el texto del error
        console.error("Error al subir a Cloudinary (Respuesta no OK):", res.status, errorText);
        throw new Error(`Cloudinary upload failed with status ${res.status}: ${errorText}`);
      }

      const fileData = await res.json();
      console.log("Respuesta de Cloudinary (fileData): ", fileData);

      // Verificar si fileData y fileData.url existen
      if (fileData && fileData.url) {
        return fileData.url.toString();
      } else {
        console.error("Cloudinary response did not contain a URL:", fileData);
        throw new Error("No URL found in Cloudinary response.");
      }
    } catch (error) {
      console.error("Error durante la subida a Cloudinary:", error);
      // Aquí puedes manejar el error de forma más específica, por ejemplo,
      // mostrar un mensaje al usuario o reintentar la subida.
      throw error; // Propaga el error para que handleOnChange lo pueda capturar
    }
  } else {
    console.log("No se proporcionó ninguna imagen para subir.");
    // Podrías lanzar un error aquí también si "pics" es un argumento requerido.
    return null; // O throw new Error("No image provided");
  }
};

