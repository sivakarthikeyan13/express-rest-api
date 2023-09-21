import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ProductModel, {
  Product,
  ProductDocument,
} from "../models/products.model";

async function createProduct(input: Product) {
  try {
    const product = await ProductModel.create(input);
    return product.toJSON();
  } catch (e: any) {
    throw new Error(e);
  }
}

async function findProduct(
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) {
  try {
    const product = ProductModel.findOne(query, {}, options);
    return product;
  } catch (e: any) {
    throw new Error(e);
  }
}

async function findAndUpdateProduct(
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions
) {
  return ProductModel.findOneAndUpdate(query, update, options);
}

async function deleteProduct(query: FilterQuery<ProductDocument>) {
  return ProductModel.deleteOne(query);
}

export { createProduct, findProduct, findAndUpdateProduct, deleteProduct };
