import dbConnect from "@/lib/db";
import TodoModel from "@/models/todo";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        const data = await req.json();
        await dbConnect();
        const todo = new TodoModel(data);
        await todo.save();
        console.log("error")
        return NextResponse.json(
            {
                data,

                message: "todo has been added successfully"

            }
        )
    }
    catch (error) {
        return NextResponse.json(
            {
                error: "error occured"
            },
            {
                status: 500
            }
        );
    };
};