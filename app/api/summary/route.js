import { NextResponse } from "next/server";
import connectToMongoDB from "@/libs/mongodb.js";
import UserModel from "@/models/holes"; // Assuming you have a UserModel defined
import { getSession } from '@auth0/nextjs-auth0';
import { parse } from 'url';



export async function GET(request) {
  const { query } = parse(request.url, true);
  const userName = query.username;

  await connectToMongoDB();
  
  // Find the user by username
  const user = await UserModel.findOne({ username: userName });


  return NextResponse.json({user}, { status: 200 });
}


// export async function GET(request){

//   const { query } = parse(request.url, true);

//   console.log(query)

//   const userName = query.username;

//   console.log(userName)

  


  
  

  
 


//   await connectToMongoDB()


//   const usernameToFind = 'Evan Fung';
//   const users = await UserModel.find( {username: userName} )
//   return NextResponse.json({users})
// }
