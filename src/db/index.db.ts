import { dbConfig } from "@config";
import { MongoClient, type MongoClientOptions } from "mongodb";

const { dbName, dbPass } = dbConfig;
const url = `mongodb+srv://leonelroman:${dbPass}@cluster0.fo3dmlm.mongodb.net/?w=majority`;

const client = new MongoClient(url, {
  retryWrites: true,
  appName: "Cluster0",
} as MongoClientOptions);

await client.connect();

const productsModel = client.db(dbName).collection("products");

const adminModel = client.db(dbName).collection("admin");

export { productsModel, adminModel };
