import { NextResponse } from "next/server";
import connectToMongoDB from "@/libs/mongodb.js";
import UserModel from "@/models/holes"; 
import { getSession } from '@auth0/nextjs-auth0';
import { parse } from 'url';




export async function POST(request) {
  try {
    const { Hole_Number, Par, Strokes, Putts, FIR, GIR } = await request.json();
    const session = await getSession(request);

    if (!session || !session.user) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    const { user } = session;

    await connectToMongoDB();

    let currentUser = await UserModel.findOne({ username: user.name });

    
    if (!currentUser) {
      currentUser = new UserModel({
        username: user.name,
        rounds: [{ name: "Initial Round", holes: [] }] 
      });
    }

    const newHole = {
      holeNumber: Hole_Number,
      par: Par,
      strokes: Strokes,
      totalPutts: Putts,
      FIR,
      GIR
    };

    
    const mostRecentRound = currentUser.rounds[currentUser.rounds.length - 1];

    
    mostRecentRound.holes.push(newHole);

    await currentUser.save();

    return NextResponse.json({ message: "Hole Created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating hole:", error);
    return NextResponse.json({ error: "Failed to create hole" }, { status: 500 });
  }
}


export async function GET(request) {
  const { query } = parse(request.url, true);
  const userName = query.username;

  await connectToMongoDB();
  
  
  const user = await UserModel.findOne({ username: userName });
  if (!user || user.rounds.length === 0) {
    return NextResponse.json({ error: "No rounds found for user" }, { status: 404 });
  }

  
  const mostRecentRound = user.rounds[user.rounds.length - 1];
  
  return NextResponse.json({ round: mostRecentRound }, { status: 200 });
}


