import { productsModel } from "../db/index.db.js";
import { deleteFile } from "../libs/cloudinary.js";
import { Validate } from "../libs/zod.js";
async function getProducts(req, res) {
  const queryParams = req.query;

  if (!queryParams?.q) {
    res.status(400).json({
      message:
        "Debes especificar la cantidad de productos que deseas obtener. (ej: ?q=20)",
    });
    return;
  }
  const q = Number(queryParams.q.toString());
  const isNotANumber = isNaN(q);

  if (isNotANumber) {
    res.status(400).json({
      message: "La cantidad debe ser un número. (ej: ?q=20)",
    });
    return;
  }

  try {
    const products = await productsModel.find({}).limit(q).toArray();

    res.json({
      quantity_query: q,
      quantity_obtained: products.length,
      products,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error en el servidor." });
  }
}

async function deleteProduct(req, res) {
  const queryParams = req.query;

  const wrongParams = !queryParams?.id || !queryParams?.publicId;
  if (wrongParams) {
    res.status(400).json({
      message: "Debes enviar el id y el publicId en los query params.",
    });
    return;
  }

  try {
    await productsModel.findOneAndDelete({ _id: queryParams.id });
    await deleteFile(queryParams.publicId);

    res.json({ message: "Producto eliminado." });
  } catch (e) {
    res.status(500).json({ message: "Error en el servidor." });
  }
}

async function uploadProduct(req, res) {
  const { validate } = new Validate("product");

  const { success, data, errors } = validate(req.body);

  if (!success) {
    res
      .status(400)
      .json({ message: "Error al validar los datos enviados.", errors });
    return;
  }

  try {
    const {
      title,
      description,
      wholesale_price,
      retail_price,
      in_stock,
      stock_count,
    } = data;
  } catch {}
}
export { getProducts, deleteProduct, uploadProduct };
