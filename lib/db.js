import mongoose from "mongoose";

// Serverless functions can be invoked many times per minute, each in a
// "warm" reused process or a fresh one. Opening a new MongoDB connection on
// every invocation would exhaust the database's connection limit, so we
// cache the connection (and the in-flight connection promise) on the
// global object, which survives between invocations of the same warm
// function instance.
let cached = global._sunflowerMongooseCache;
if (!cached) {
  cached = global._sunflowerMongooseCache = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error(
        "MONGODB_URI is not set. Add it in Vercel's Project Settings > Environment Variables."
      );
    }

    mongoose.set("strictQuery", true);

    cached.promise = mongoose.connect(uri).then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
