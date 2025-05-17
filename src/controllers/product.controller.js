import { productsModel } from "../db/index.db.js";
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

export { getProducts };
