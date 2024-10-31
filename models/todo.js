import mongoose from "mongoose"
const Schema = new mongoose.Schema(
    {



        title:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            required: false,
        },
        status: {
            type: Boolean,
            required: false,
        },
        deadline:{
            type: Date,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);
const TodoModel = mongoose.models.todo || mongoose.model("todo", Schema);

export default TodoModel;