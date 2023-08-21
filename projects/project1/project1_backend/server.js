const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const http = require("http"); // Import the http module
const WebSocket = require("ws"); // Import the ws module
const {
  connectDatabase,
  client,
  getNextUserId,
  getNextMessageId,
} = require("./data-manager");
connectDatabase();
const JWT_SECRET_KEY = "contact-form-manager-server-secret-key";

const app = express();
app.use(cors());

// Create an HTTP server
const server = http.createServer(app);

// Create a WebSocket server by passing the HTTP server as an argument
const wss = new WebSocket.Server({ server });

const port = 5165;

app.get("/", (req, res) => {
  res.status(200).send("Hello, World!");
});

// Handle WebSocket connections
wss.on("connection", (ws) => {
  console.log("Client connected to WebSocket");

  // Handle incoming messages from the client
  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// sample GET request handler (you can ignore this endpoint)
app.get("/api/greeting", (req, res) => {
  const name = req.query.name || "Anonymous";
  res.status(200).send(`Hello, ${name}!`);
});

// sample POST request handler (you can ignore this endpoint)
app.post("/api/message", express.json(), (req, res) => {
  const message = req.body.message || "No message provided";
  res.status(200).send(`Your message: ${message}`);
});

async function checkTokenAndRole(req, res, roleList) {
  const { token } = req.headers;
  if (!token) {
    res.status(401).send({ error: "User is not authenticated" });
    return false;
  }
  try {
    const jwtTokenPayload = jwt.verify(token, JWT_SECRET_KEY);

    // Check if the token is blacklisted
    const db = client.db();
    const blacklistedTokensCollection = db.collection("blacklisted-tokens");
    const isTokenBlacklisted = await blacklistedTokensCollection.findOne({
      token,
    });

    if (isTokenBlacklisted) {
      res.status(401).send({ error: "User is not authenticated" });
      return false;
    }

    const usersCollection = db.collection("users");
    const existingUser = await usersCollection.findOne({
      id: jwtTokenPayload.userId,
    });

    if (!existingUser) {
      res.status(401).send({ error: "User is not authenticated" });
      return false;
    }

    if (
      roleList &&
      roleList.length > 0 &&
      !roleList.includes(existingUser.role)
    ) {
      res.status(403).send({ error: "User is not authorized" });
      return false;
    }
  } catch (err) {
    res.status(401).send({ error: "User is not authenticated" });
    return false;
  }
  return true;
}

// POST login user
app.post("/api/user/login", express.json(), async (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    res.status(400).send({ error: "Username is required" });
    return;
  }
  if (!password) {
    res.status(400).send({ error: "Password is required" });
    return;
  }

  try {
    const db = client.db();
    const usersCollection = db.collection("users");

    const existingUser = await usersCollection.findOne({ username });

    if (!existingUser) {
      res.status(400).send({ error: "Username does not exist" });
      return;
    }

    if (existingUser.password !== password) {
      res.status(400).send({ error: "Password is incorrect" });
      return;
    }

    const jwtTokenPayload = {
      userId: existingUser.id,
      username: existingUser.username,
    };

    const jwtToken = jwt.sign(jwtTokenPayload, JWT_SECRET_KEY, {
      expiresIn: "55m",
    });

    res.status(200).send({ data: { user: existingUser, token: jwtToken } });
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

// POST check if user is logged in
app.post("/api/user/check-login", express.json(), async (req, res) => {
  const { token } = req.headers;
  if (!token) {
    res.status(401).send({ error: "Token is required" });
    return;
  }

  try {
    const jwtTokenPayload = jwt.verify(token, JWT_SECRET_KEY);

    const db = client.db();
    const blacklistedTokensCollection = db.collection("blacklisted-tokens");
    const isTokenBlacklisted = await blacklistedTokensCollection.findOne({
      token,
    });

    if (isTokenBlacklisted) {
      res.status(401).send({ error: "Token is invalid" });
      return;
    }

    const usersCollection = db.collection("users");
    const existingUser = await usersCollection.findOne({
      id: jwtTokenPayload.userId,
    });

    if (!existingUser) {
      res.status(400).send({ error: "User does not exist" });
      return;
    }

    res.status(200).send({ data: { user: existingUser } });
  } catch (error) {
    res.status(401).send({ error: "Token is invalid" });
  }
});

app.post("/api/user/logout", express.json(), async (req, res) => {
  const { token } = req.headers;
  if (!token) {
    res.status(401).send({ error: "Token is required" });
    return;
  }

  try {
    const db = client.db();
    const blacklistedTokensCollection = db.collection("blacklisted-tokens");

    const blacklistedToken = { token };
    await blacklistedTokensCollection.insertOne(blacklistedToken);

    res.status(200).send({ data: { message: "Logged out successfully" } });
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

app.get("/api/countries", async (req, res) => {
  try {
    const db = client.db();
    const countriesCollection = db.collection("countries");

    const countries = await countriesCollection.findOne({}); // Assuming all countries are stored in a single document
    console.log("countries API:", countries);

    if (!countries) {
      res.status(404).send({ error: "Countries not found" });
      return;
    }

    res.status(200).send({ data: { countries: countries.countries } });
  } catch (error) {
    console.error("Error retrieving countries:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

app.post("/api/message/add", express.json(), async (req, res) => {
  const { name, message, gender, country } = req.body;

  if (!name || !message || !gender || !country) {
    res.status(400).send({ error: "Required fields are missing" });
    return;
  }

  try {
    const db = client.db();
    const messagesCollection = db.collection("messages");

    const newMessageId = await getNextMessageId();
    const newMessage = {
      id: newMessageId,
      name,
      message,
      gender,
      country,
      creationDate: new Date().toISOString(),
      read: "false",
    };

    await messagesCollection.insertOne(newMessage);

    // Broadcast the new message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(newMessage));
      }
    });

    res.status(200).send({ data: { message: newMessage } });
  } catch (error) {
    console.error("Error adding new message:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

app.get("/api/messages", async (req, res) => {
  const authCheck = await checkTokenAndRole(req, res, ["admin", "reader"]);
  if (!authCheck) {
    return;
  }

  try {
    const db = client.db();
    const messagesCollection = db.collection("messages");

    const messages = await messagesCollection.find({}).toArray();

    res.status(200).send({ data: { messages } });
  } catch (error) {
    console.error("Error retrieving messages:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

app.get("/api/messagesPagination", async (req, res) => {
  const authCheck = await checkTokenAndRole(req, res, ["admin", "reader"]);
  if (!authCheck) {
    return;
  }

  const {
    page = 1,
    perPage = 10,
    sortBy = "gender",
    sortOrder = "asc",
  } = req.query;

  try {
    const db = client.db();
    const messagesCollection = db.collection("messages");

    const sortDirection = sortOrder.toLowerCase() === "asc" ? 1 : -1;

    const allowedSortColumns = ["name", "gender", "creationDate", "country"];
    const sortColumn = allowedSortColumns.includes(sortBy)
      ? sortBy
      : "creationDate";

    // Get total count of messages
    const totalCount = await messagesCollection.countDocuments();

    // Sort and paginate messages using MongoDB aggregation
    const paginatedMessages = await messagesCollection
      .aggregate([
        {
          $sort: { [sortColumn]: sortDirection },
        },
        {
          $skip: (page - 1) * parseInt(perPage),
        },
        {
          $limit: parseInt(perPage),
        },
      ])
      .toArray();

    res.status(200).send({
      data: { messages: paginatedMessages, totalCount },
    });
  } catch (error) {
    console.error("Error retrieving paginated messages:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

// GET messages by infinite scroll
app.get("/api/messagesInfiniteScroll", async (req, res) => {
  const authCheck = await checkTokenAndRole(req, res, ["admin", "reader"]);
  if (!authCheck) {
    return;
  }

  const page = parseInt(req.query.page) || 1; // Get the requested page number from the query parameter
  const pageSize = 10; // Number of messages to load per page

  try {
    const db = client.db();
    const messagesCollection = db.collection("messages");

    const startIndex = (page - 1) * pageSize;

    // Fetch messages for the current page
    const paginatedMessages = await messagesCollection
      .find({})
      .skip(startIndex)
      .limit(pageSize)
      .toArray();

    // Check if there are more messages
    const totalCount = await messagesCollection.countDocuments();
    const hasMorePages = startIndex + pageSize < totalCount;

    res
      .status(200)
      .send({ data: { messages: paginatedMessages, hasMorePages } });
  } catch (error) {
    console.error("Error retrieving messages for infinite scroll:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

// GET message by id
app.get("/api/message/:id", async (req, res) => {
  const authCheck = await checkTokenAndRole(req, res, ["admin", "reader"]);
  if (!authCheck) {
    return;
  }

  const { id } = req.params;

  try {
    const db = client.db();
    const messagesCollection = db.collection("messages");

    // Find the message by its ID
    const message = await messagesCollection.findOne({ id: parseInt(id) });

    if (!message) {
      res.status(404).send({ error: "Message not found" });
      return;
    }

    res.status(200).send({ data: { message } });
  } catch (error) {
    console.error("Error retrieving message by ID:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

// POST read message by id
app.post("/api/message/read/:id", express.json(), async (req, res) => {
  const authCheck = await checkTokenAndRole(req, res, ["admin", "reader"]);
  if (!authCheck) {
    return;
  }

  const { id } = req.params;

  try {
    const db = client.db();
    const messagesCollection = db.collection("messages");

    // Find the message by its ID
    const message = await messagesCollection.findOne({ id: parseInt(id) });

    if (!message) {
      res.status(404).send({ error: "Message not found" });
      return;
    }

    // Update the "read" status of the message
    await messagesCollection.updateOne(
      { id: parseInt(id) },
      { $set: { read: "true" } }
    );

    res.status(200).send({ data: { message } });
  } catch (error) {
    console.error("Error marking message as read:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

// POST delete message by id
app.post("/api/message/delete/:id", express.json(), async (req, res) => {
  const authCheck = await checkTokenAndRole(req, res, ["admin"]);
  if (!authCheck) {
    return;
  }

  const { id } = req.params;

  try {
    const db = client.db();
    const messagesCollection = db.collection("messages");

    // Delete the message by its ID
    const deleteResult = await messagesCollection.deleteOne({
      id: parseInt(id),
    });

    if (deleteResult.deletedCount === 0) {
      res.status(404).send({ error: "Message not found" });
      return;
    }

    res.status(200).send({ data: { message: { id } } });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

// POST add new user with reader role
app.post("/api/user/add-reader", express.json(), async (req, res) => {
  const authCheck = await checkTokenAndRole(req, res, ["admin"]);
  if (!authCheck) {
    return;
  }

  const { username, password, base64Photo } = req.body;

  if (!username) {
    res.status(400).send({ error: "Username is required" });
    return;
  }
  if (!password) {
    res.status(400).send({ error: "Password is required" });
    return;
  }
  if (!base64Photo) {
    res.status(400).send({ error: "Photo is required" });
    return;
  }

  try {
    const db = client.db();
    const usersCollection = db.collection("users");

    // Check if the username already exists
    const existingUser = await usersCollection.findOne({ username });

    if (existingUser) {
      res.status(400).send({ error: "Username already exists" });
      return;
    }

    const newUserId = await getNextUserId();
    const newUser = {
      id: newUserId,
      username,
      password,
      base64Photo,
      role: "reader",
    };

    // Insert the new user into the collection
    await usersCollection.insertOne(newUser);

    res.status(200).send({ data: { user: newUser } });
  } catch (error) {
    console.error("Error adding new user:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

app.get("/api/users", async (req, res) => {
  const authCheck = await checkTokenAndRole(req, res, ["admin"]);
  if (!authCheck) {
    return;
  }

  try {
    const db = client.db();
    const usersCollection = db.collection("users");

    // Find all users in the collection
    const users = await usersCollection.find().toArray();

    res.status(200).send({ data: { users } });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

// GET user by id
app.get("/api/user/:id", async (req, res) => {
  const authCheck = await checkTokenAndRole(req, res, ["admin"]);
  if (!authCheck) {
    return;
  }

  const { id } = req.params;

  try {
    const db = client.db();
    const usersCollection = db.collection("users");

    // Find the user with the specified ID
    const user = await usersCollection.findOne({ id: parseInt(id) });

    if (!user) {
      res.status(404).send({ error: "User not found" });
      return;
    }

    res.status(200).send({ data: { user } });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

// POST update user by id
app.post("/api/user/update/:id", express.json(), async (req, res) => {
  const authCheck = await checkTokenAndRole(req, res, ["admin"]);
  if (!authCheck) {
    return;
  }

  const { id } = req.params;
  const { username, password, base64Photo } = req.body;

  if (!username) {
    res.status(400).send({ error: "Username is required" });
    return;
  }
  if (!password) {
    res.status(400).send({ error: "Password is required" });
    return;
  }
  if (!base64Photo) {
    res.status(400).send({ error: "Photo is required" });
    return;
  }

  try {
    const db = client.db();
    const usersCollection = db.collection("users");

    // Update the user's fields based on the request body
    const updatedUser = {
      username: "" + username,
      password: "" + password,
      base64Photo: "" + base64Photo,
    };

    // Update the user document in the collection
    const updateResult = await usersCollection.updateOne(
      { id },
      { $set: updatedUser }
    );

    if (updateResult.matchedCount === 0) {
      res.status(404).send({ error: "User not found" });
      return;
    }

    res.status(200).send({ data: { user: updatedUser } });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});
