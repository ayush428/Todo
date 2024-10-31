import dbConnect from "@/lib/db";
import TodoModel from "@/models/todo";
import { NextResponse } from "next/server";

export async function GET(req, res){
    try{
        await dbConnect();
            const todo =await TodoModel.find({});
        
        return NextResponse.json(
            {
                todo,
                
                    message: "todo has been added successfully"
                
            }
        )
    }
    catch(error){
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