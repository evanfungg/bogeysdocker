'use client'
import React from "react"
import { useEffect, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client';
import FirGraph from "@components/FirGraph"
import GirGraph from "@components/GirGraph"
import ScoresGraph from "@components/ScoresGraph"
import PuttsGraph from "@components/PuttsGraph"
import './styles.css'
import Link from 'next/link'


const Holes = () => {
    
  
  const [data, setData] = useState(null); 
  const { user, isLoading } = useUser(); 

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoading && user) {
        try {
          const res = await fetch(`/api/holes?username=${user.name}`, {
            method: "GET",
            cache: "no-store",
          });

          if (!res.ok) {
            throw new Error("Failed to get holes");
          }

          const data = await res.json();
          setData(data); 
        } catch (error) {
          console.error("Error loading holes:", error);
        }
      }
    };

    fetchData();
  }, [user, isLoading]); 

  if (!data) {
    return <div>Loading...</div>; 
  }

    
   
   
    const allHoles = data.round.holes;
    console.log(allHoles)
    const roundName = data.round.name
    const scoresData = (allHoles.map(hole => hole.strokes - hole.par));


    const totalHoles = allHoles.length
    console.log("total holes: " + totalHoles)
    console.log(allHoles[0].par)
    

    let totalStrokes = 0
    for (let i = 0; i < allHoles.length; i++) {
        totalStrokes += allHoles[i].strokes
    }

    console.log("total strokes: " + totalStrokes)

    let totalPutts = 0
    for (let i = 0; i < allHoles.length; i++) {
        totalPutts += allHoles[i].totalPutts
    }

    console.log("total putts: " + totalPutts)

    let coursePar = 0
    for (let i = 0; i < allHoles.length; i++) {
        coursePar += allHoles[i].par
    }

    console.log("total par: " + coursePar)

    let score = totalStrokes - coursePar
    if (score > 0) {
        score = "+" + score
    }

    console.log("score today was: " + score)

    let totalFIR = 0
    console.log(allHoles[0].FIR)
    for (let i = 0; i < allHoles.length; i++) {
        if (allHoles[i].FIR)
            totalFIR += allHoles[i].FIR
        }

    console.log("total FIRs hit: " + totalFIR)

    let percentFIR = (totalFIR / totalHoles * 100).toFixed(1)

    console.log(percentFIR)

    let totalGIR = 0
    console.log(allHoles[0].GIR)
    for (let i = 0; i < allHoles.length; i++) {
        if (allHoles[i].GIR)
            totalGIR += allHoles[i].GIR
        }

    console.log("total GIRs hit: " + totalGIR)

    let percentGIR = ((totalGIR / totalHoles) * 100).toFixed(1)

    console.log(percentGIR)

    let threePutts = 0
    for (let i = 0; i < allHoles.length; i++) {
        if (allHoles[i].totalPutts >= 3) {
            threePutts++
        }
    }

    console.log(threePutts)

    

    return(
        <main className="main">
             <div className="header">
                <h1 className="main-title">Your Round at {roundName}</h1>
                <Link href = './career'><button className="career">Career Stats</button></Link>
                <button className="logout"><a href="/api/auth/logout">Logout</a></button>
            </div>
           
            
            <div className="container">
                <div className="total-container">
                    <div className="total-title">
                        Totals
                    </div>
                    <div className="total-data">
                        You shot: {totalStrokes} ({score})
                    </div>
                    <div className="total-chart">
                        <ScoresGraph holes={allHoles}></ScoresGraph>
                    </div>
                </div>

                <div className="tee-container">
                    <div className="tee-title">
                        Off the Tee
                    </div>
                    <div className="tee-data">
                        You hit: {totalFIR} fairways (%{percentFIR})
                    </div>
                    <div className="tee-chart">
                        <FirGraph holes={allHoles}></FirGraph>
                    </div>
                </div>

                <div className="putts-container">
                    <div className="putts-title">
                        On the Green
                    </div>
                    <div className="putts-data">
                        You hit: {totalPutts} putts ({threePutts} 3-putts)
                    </div>
                    <div className="putts-chart">
                        <PuttsGraph holes={allHoles}></PuttsGraph>
                    </div>
                </div>

                <div className="approach-container">
                    <div className="approach-title">
                        From the Fairway
                    </div>
                    <div className="approach-data">
                        You hit: {totalGIR} greens (%{percentGIR})
                    </div>
                    <div className="approach-chart">
                        <GirGraph holes={allHoles}></GirGraph>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Holes