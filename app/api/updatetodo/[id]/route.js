import dbConnect from "@/lib/db";
import TodoModel from "@/models/todo";
import { NextResponse } from "next/server";

export async function PATCH(req,{params}, res){
    try{
        const data = await req.json();
        const {id} = params;
        console.log(id);
        console.log(params)
        await dbConnect();
            const todo =await TodoModel.findById(id);
            if (!todo){

                return NextResponse.json({error: "Todo not found"}, {status: 404})
            }
            const todoDel = await TodoModel.findByIdAndUpdate(id, data,{
                new:true,
                runValidators: true,
            });
            return NextResponse.json({message: "Todo has been updated"}, {status: 200})
        
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