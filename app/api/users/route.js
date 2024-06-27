import { ConnectDB } from "@/libs/mongo";
import User from "@/models/Users";
import { messages } from "@/utils/messajes";
import { NextResponse } from "next/server";

export async function GET() {
    try {
     await ConnectDB()
     const users = await User.find()

     return NextResponse.json({
        users
     },{
        status: 200
     })
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:messages.error.defaultError},{status:200})
}}