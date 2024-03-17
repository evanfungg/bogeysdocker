import { NextResponse } from "next/server";
import connectToMongoDB from "@/libs/mongodb.js"; 
import UserModel from "@/models/holes"; 
import { getSession } from '@auth0/nextjs-auth0';

export async function POST(request) {
  try {
    const { roundName } = await request.json();
    const session = await getSession(request);

    // Check if session and user information is available along with roundName
    if (!session || !session.user || !roundName) {
      return new NextResponse(JSON.stringify({ error: "Missing user information or round name" }), { status: 400 });
    }

    const { user } = session;

    await connectToMongoDB();

    // Attempt to find the user by username
    let currentUser = await UserModel.findOne({ username: user.name });

    // If the user does not exist, create a new one with the username and an empty rounds array
    if (!currentUser) {
      currentUser = new UserModel({
        username: user.name, // This matches the username field in your schema
        rounds: [] // Initializes with an empty rounds array
      });
      await currentUser.save();
    }

    // Adding a new round to the user's rounds array
    currentUser.rounds.push({
      name: roundName, // The name of the round, as provided in the request
      holes: [] // Starts with an empty holes array
    });

    await currentUser.save(); // Save the updated user document

    return new NextResponse(JSON.stringify({ message: "Round created successfully" }), { status: 201 });
  } catch (error) {
    console.error("Error creating round:", error);
    return new NextResponse(JSON.stringify({ error: "Failed to create round" }), { status: 500 });
  }
}
