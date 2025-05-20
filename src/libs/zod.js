import { z } from "zod";

class Validate {
  #schemas = {};
  schemaName = "";
  constructor(schemaName = "") {
    this.schemaName = schemaName;
    // Esquema base genérico, puede ser extendido según necesidades
    this.#schemas = {
      // Ejemplo de esquema para un producto
      product: z.object({
        title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
        in_stock: z.boolean(),
        stock_count: z
          .number()
          .positive("El contador de stock debe ser mayor que 0"),
        wholesale_price: z.number().positive("El precio debe ser mayor que 0"),
        retail_price: z.number().positive("El precio debe ser mayor que 0"),
        description: z
          .string()
          .max(500, "La descripción no puede exceder 500 caracteres")
          .optional(),
      }),
    };
  }

  // Método para validar datos contra un esquema específico
  validate(data) {
    const { schemaName } = this;
    try {
      const schema = this.#schemas[schemaName];
      if (!schema) {
        throw new Error(`Esquema ${schemaName} no encontrado`);
      }
      const result = schema.parse(data); // Valida los datos
      return { success: true, data: result };
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          success: false,
          errors: error.errors.map((err) => ({
            path: err.path.join("."),
            message: err.message,
          })),
        };
      }
      return { success: false, errors: [{ message: error.message }] };
    }
  }

  // Método para añadir un nuevo esquema dinámicamente
  addSchema(schemaDefinition) {
    if (this.#schemas[this.schemaName]) {
      throw new Error(`El esquema ${this.schemaName} ya existe`);
    }
    this.#schemas[this.schemaName] = z.object(schemaDefinition);
  }

  // Método para obtener un esquema existente
  getSchema() {
    return this.#schemas[this.schemaName] || null;
  }
}

export { Validate };
