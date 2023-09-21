import { TypeOf, number, object, string } from "zod";

const payload = {
  body: object({
    title: string({
      required_error: "Title is required",
    }),
    description: string({
      required_error: "Description is required",
    }).min(120, "Description should be at least 120 characters long"),
    price: number({
      required_error: "Price is required",
    }),
    image: string({
      required_error: "Image is required",
    }),
  }),
};

const params = {
  params: object({
    productId: string({ required_error: "ProductId is required" }),
  }),
};

const createProductSchema = object({
  ...payload,
});

const getProductSchema = object({
  ...params,
});

const updateProductSchema = object({
  ...payload,
  ...params,
});

const deleteProductSchema = object({
  ...params,
});

type CreateProductInput = TypeOf<typeof createProductSchema>;
type GetProductInput = TypeOf<typeof getProductSchema>;
type UpdateProductInput = TypeOf<typeof updateProductSchema>;
type DeleteProductInput = TypeOf<typeof deleteProductSchema>;

export {
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
  getProductSchema,
  CreateProductInput,
  GetProductInput,
  UpdateProductInput,
  DeleteProductInput,
};
