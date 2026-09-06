// models/Schema.ts
import mongoose from 'mongoose';

export interface BlogDocument {
  title: string;
  slug: string;
  description: string;
  content: any;
  category: string;
  image: string;
  date: Date;
  popularity: number;
  author: string;
  createdAt: Date;
}

export interface ProjectDocument {
  slug: string;
  title: string;
  desc: string;
  tech: string;
  status: string;
  live: string;
  price: string;
  img: string;
  category: string;
  createdAt: Date;
}

// --- Existing schemas ---
const OrderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  service: { type: String, required: true },
  budget: { type: String, required: false },
  message: { type: String, required: false },
  createdAt: { type: Date, default: Date.now }
});

const FormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  service: { type: String, default: 'General Inquiry' },
  message: { type: String, required: false },
  createdAt: { type: Date, default: Date.now }
});

const HireMeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: false },
  createdAt: { type: Date, default: Date.now }
});

// --- NEW: Blog Schema ---
const BlogSchema = new mongoose.Schema<BlogDocument>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  content: { type: mongoose.Schema.Types.Mixed, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  date: { type: Date, default: Date.now },
  popularity: { type: Number, default: 0 },
  author: { type: String, default: "Admin" },
  createdAt: { type: Date, default: Date.now },
});
const ProjectSchema = new mongoose.Schema<ProjectDocument>({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  tech: { type: String, required: true },   // "React", "Next.js", "HTML"
  status: { type: String, default: "Completed" },
  live: { type: String, default: "#" },
  price: { type: String, required: true },  // e.g. "₹7,999"
  img: { type: String, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// --- Exports ---
export const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
export const Form = mongoose.models.Form || mongoose.model('Form', FormSchema);
export const HireMe = mongoose.models.HireMe || mongoose.model('HireMe', HireMeSchema);
export const Blog =
  (mongoose.models.Blog as mongoose.Model<BlogDocument>) ||
  mongoose.model<BlogDocument>('Blog', BlogSchema);
// Schema.ts (add after existing schemas)
export const Project =
  (mongoose.models.Project as mongoose.Model<ProjectDocument>) ||
  mongoose.model<ProjectDocument>("Project", ProjectSchema);






