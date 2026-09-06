// lib/mongodb.ts
import mongoose from "mongoose";

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

function sanitizeMongoUri(rawUri: string): string {
  let uri = rawUri.trim();
  // Handle case where database name was appended after query params, e.g., ?retryWrites=true&w=majority/portflio
  const trailingDbMatch = uri.match(/^(mongodb(?:\+srv)?:\/\/[^/]+\/[^?]*\?[^/]+)\/([a-zA-Z0-9_-]+)$/);
  if (trailingDbMatch) {
    const [, baseWithQuery, dbName] = trailingDbMatch;
    // Insert dbName into the path before the query
    uri = baseWithQuery.replace(/(\.mongodb\.net\/)([^?]*)(\?.*)/, `$1${dbName}$3`);
  }
  return uri;
}

async function dbConnect() {
  const rawUri = process.env.MONGODB_URI;
  if (!rawUri) {
    throw new Error("MONGODB_URI is not configured in environment variables");
  }

  const uri = sanitizeMongoUri(rawUri);

  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise || mongoose.connection.readyState === 0) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(uri, opts).catch((error) => {
      console.error("MongoDB connection failed:", {
        name: error instanceof Error ? error.name : "UnknownError",
        message: error instanceof Error ? error.message : String(error),
        code: error && typeof error === "object" && "code" in error ? error.code : undefined,
      });
      cached.promise = null;
      throw error;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;