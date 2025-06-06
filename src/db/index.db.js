import { dbConfig, isProduction } from "../config.js";
import { MongoClient } from "mongodb";

const { dbName, dbPass } = dbConfig;
const url = `mongodb+srv://leonelroman:${dbPass}@cluster0.fo3dmlm.mongodb.net/?w=majority`;

const client = new MongoClient(url, {
  retryWrites: true,
  appName: "Cluster0",
});

await client.connect();

!isProduction && console.log("CONNECTED ON DB:", dbName);

const productsModel = client.db(dbName).collection("products");

const adminModel = client.db(dbName).collection("admin");

export { productsModel, adminModel };
