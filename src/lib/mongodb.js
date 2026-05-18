import { MongoClient } from "mongodb";
import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");  // ← এটা add করো
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const client = new MongoClient(process.env.MONGODB_URI, {
  family: 4,
});

let db;

export async function getDB() {
  if (!db) {
    await client.connect();
    db = client.db("DocAppointDB");
  }
  return db;
}