const { MongoClient, ObjectId } = require("mongodb");
const { promisify } = require("util");
const fs = require("fs");

// Promisify the fs.readFile function
const readFileAsync = promisify(fs.readFile);

const uri = "mongodb://127.0.0.1:27017/contact-mdb"; // Update with your MongoDB URI
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectDatabase() {
  try {
    await client.connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

// Function to retrieve data from a MongoDB collection
async function readDataFromCollection(collectionName) {
  const db = client.db();
  const collection = db.collection(collectionName);
  const data = await collection.find({}).toArray();
  return data;
}

// Function to write data to a MongoDB collection
async function writeDataToCollection(collectionName, data) {
  const db = client.db();
  const collection = db.collection(collectionName);

  try {
    await collection.insertMany(data);
    console.log("Data written to collection:", collectionName);
  } catch (error) {
    console.error("Error writing to collection:", error);
  }
}

// Function to retrieve the next user ID and update the last ID in MongoDB
async function getNextUserId() {
  const db = client.db();
  const lastIdCollection = db.collection("last-id"); // Assuming you have a collection named 'lastId'

  const lastIdDocument = await lastIdCollection.findOneAndUpdate(
    {},
    { $inc: { user: 1 } },
    { upsert: true, returnOriginal: false }
  );

  return lastIdDocument.value.user;
}

// Function to retrieve the next message ID and update the last ID in MongoDB
async function getNextMessageId() {
  const db = client.db();
  const lastIdCollection = db.collection("last-id"); // Assuming you have a collection named 'lastId'

  const lastIdDocument = await lastIdCollection.findOneAndUpdate(
    {},
    { $inc: { message: 1 } },
    { upsert: true, returnOriginal: false }
  );

  return lastIdDocument.value.message;
}

module.exports = {
  client,
  connectDatabase,
  readDataFromCollection,
  writeDataToCollection,
  getNextUserId,
  getNextMessageId,
};
