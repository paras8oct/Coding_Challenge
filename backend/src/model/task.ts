import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    due: { type: Date, required: true },
    complete: { type: Boolean, default: false },
    description: { type: String }
});

export default mongoose.model('taks', taskSchema);