import { v2 as cld } from "cloudinary";
import { cldConfig } from "../config.js";

cld.config({
  api_key: cldConfig.apiKey,
  api_secret: cldConfig.apiSecret,
  cloud_name: cldConfig.cldName,
});
async function uploadFile(
  buffer,
  { folder = "", resourceType = "auto", tags = [] }
) {
  try {
    const result = await cld.uploader
      .upload_stream({
        resource_type: resourceType,
        folder,
        tags,
      })
      .end(buffer);

    return {
      secureUrl: result.secure_url,
      publicId: result.public_id,
      tags: result.tags,
    };
  } catch {
    throw new Error("Error al subir el buffer a cloudinary.");
  }
}

async function deleteFile(publicId) {
  try {
    await cld.uploader.destroy(publicId);
  } catch {
    throw new Error("Error al borrar la imagen de cloudinary.");
  }
}

export { uploadFile, deleteFile };
