import { NextResponse } from "next/server";
import connectToMongoDB from "@/libs/mongodb.js"; 
import UserModel from "@/models/holes"; 
import { getSession } from '@auth0/nextjs-auth0';

export async function POST(request) {
  try {
    const { roundName } = await request.json();
    const session = await getSession(request);

    
    if (!session || !session.user || !roundName) {
      return new NextResponse(JSON.stringify({ error: "Missing user information or round name" }), { status: 400 });
    }

    const { user } = session;

    await connectToMongoDB();

    
    let currentUser = await UserModel.findOne({ username: user.name });

    
    if (!currentUser) {
      currentUser = new UserModel({
        username: user.name, 
        rounds: [] 
      });
      await currentUser.save();
    }

    
    currentUser.rounds.push({
      name: roundName, 
      holes: [] 
    });

    await currentUser.save(); 

    return new NextResponse(JSON.stringify({ message: "Round created successfully" }), { status: 201 });
  } catch (error) {
    console.error("Error creating round:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to create round" }), { status: 500 });
  }
}
