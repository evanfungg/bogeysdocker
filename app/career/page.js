'use client'
import React from "react"
// import { getSession } from '@auth0/nextjs-auth0';
import { useEffect, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client';
import FirGraphSummary from "@components/FirGraphSummary"
import GirGraphSummary from "@components/GirGraphSummary"
import ScoresGraphSummary from "@components/ScoresGraphSummary"
import './styles.css'
import Link from 'next/link'
import PuttsGraphSummary from "@components/PuttsGraphSummary"




const Holes = () => {
    
  
  const { user, isLoading: isUserLoading } = useUser();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getHoles = async () => {
      if (user && !isUserLoading) {
        setIsLoading(true);
        try {
          const res = await fetch(`http://localhost:3000/api/summary?username=${user.name}`, {
            method: "GET",
            cache: "no-store"
          });

          if (!res.ok) {
            throw new Error("Failed to get Holes");
          }
          const data = await res.json();
          setData(data);
        } catch (error) {
          console.error("Error loading topics", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    getHoles();
  }, [user, isUserLoading]);

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }
  const rounds = data.user.rounds;
  console.log(rounds);

  let totalStrokes = 0;
  let totalRounds = rounds.length;
  
  rounds.forEach(round => {
    round.holes.forEach(hole => {
      totalStrokes += hole.strokes;
    });
  });

  const averageStrokesPerRound = totalStrokes / totalRounds;

  let totalPutts = 0;
  
  rounds.forEach(round => {
    round.holes.forEach(hole => {
      totalPutts += hole.totalPutts;
    });
  });

  const averagePuttsPerRound = totalPutts / totalRounds;

  let totalFIRs = 0;
  
  rounds.forEach(round => {
    round.holes.forEach(hole => {
      if (hole.FIR) totalFIRs += hole.FIR;
    });
  });

  const averageFIRsPerRound = totalFIRs / totalRounds;

  let totalGIRs = 0;
  
  rounds.forEach(round => {
    round.holes.forEach(hole => {
      if (hole.GIR) totalGIRs += hole.GIR;
    });
  });

  const averageGIRsPerRound = totalGIRs / totalRounds;

  let total3Putts = 0;
  
  rounds.forEach(round => {
    round.holes.forEach(hole => {
      if (hole.totalPutts >= 3) total3Putts++;
    });
  });

  const average3PuttsPerRound = total3Putts / totalRounds;

    

    return(
        <main className="main">
             <div className="header">
                <h1 className="main-title">Career Summary</h1>
                <button className="logout"><a href="/api/auth/logout">Logout</a></button>
            </div>
           
            
            <div className="container">
                <div className="total-container">
                    <div className="total-title">
                        Totals
                    </div>
                    <div className="total-data">
                        You average: {averageStrokesPerRound.toFixed(2)} strokes per round.
                    </div>
                    <div className="total-chart">
                        <ScoresGraphSummary rounds ={rounds}></ScoresGraphSummary> 
                    </div>
                </div>

                <div className="tee-container">
                    <div className="tee-title">
                        Off the Tee
                    </div>
                    <div className="tee-data">
                        You average: {averageFIRsPerRound.toFixed(2)} fairways per round.
                    </div>
                    <div className="tee-chart">
                        <FirGraphSummary rounds ={rounds}></FirGraphSummary>
                    </div>
                </div>

                <div className="putts-container">
                    <div className="putts-title">
                        On the Green
                    </div>
                    <div className="putts-data">
                        You average: {averagePuttsPerRound.toFixed(2)} putts per round.({average3PuttsPerRound.toFixed(2)} 3-putts)
                    </div>
                    <div className="putts-chart">
                        <PuttsGraphSummary rounds ={rounds}></PuttsGraphSummary>
                    </div>
                </div>

                <div className="approach-container">
                    <div className="approach-title">
                        From the Fairway
                    </div>
                    <div className="approach-data">
                    You average: {averageGIRsPerRound.toFixed(2)} greens per round.
                    </div>
                    <div className="approach-chart">
                        <GirGraphSummary rounds ={rounds}></GirGraphSummary>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Holes