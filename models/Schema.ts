import mongoose from 'mongoose';

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
    service: { type: String, required: true },
    message: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
});

const HireMeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
});

export const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
export const Form = mongoose.models.Form || mongoose.model('Form', FormSchema);
export const HireMe = mongoose.models.HireMe || mongoose.model('HireMe', HireMeSchema);
