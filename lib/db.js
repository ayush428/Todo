import mongoose from "mongoose";

// const MONGO_URI = process.env.MONGO_URI || "default-mongo-uri";
const MONGO_URI = "mongodb+srv://ayushman:Lv4UTAPhot8bQ1ys@to-do.jg3xs.mongodb.net/retryWrites=true&w=majority";


if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
console.log("test"+MONGO_URI)
  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGO_URI, options).then((mongoose) => {
      console.log("New MongoDB connection established");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("MongoDB connection successful");
    return cached.conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}

export default dbConnect;
