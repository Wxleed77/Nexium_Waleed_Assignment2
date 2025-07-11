import { MongoClient } from "mongodb"

const client = new MongoClient(process.env.MONGODB_URI!)
const dbName = "blogSummariser"

export async function saveToMongo(url: string, fullText: string) {
  const db = client.db(dbName)
  const collection = db.collection("blogs")

  await collection.insertOne({ url, fullText, createdAt: new Date() })
}
