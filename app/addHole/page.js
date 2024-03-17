"use client";
import { useState } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';
import "./styles.css";
import Link from "next/link"

export default function AddTopic() {
  const [holeNumber, setHoleNumber] = useState("");
  const [par, setPar] = useState("");
  const [strokes, setStrokes] = useState("");
  const [putts, setPutts] = useState("");
  const [GIR, setGIR] = useState(false);
  const [FIR, setFIR] = useState(false);

  const { user, error, isLoading } = useUser();
 
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  

  const changeGIR = () => {
    setGIR(prev => !prev);
  }

  const changeFIR = () => {
    setFIR(prev => !prev);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!holeNumber || !par) {
      alert("Please Enter Hole Number and Par");
      return;
    }

    try {
      const res = await fetch("/api/holes", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          Hole_Number: holeNumber,
          Par: par,
          Strokes: strokes,
          Putts: putts,
          FIR: FIR,
          GIR: GIR
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create a hole");
      }

      alert("Hole Added: Please refresh page");
    } catch (error) {
      console.error("Error creating hole:", error);
      alert("Error creating hole: " + error.message);
    }

    
  };

  return (
    <main className="main">
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <h3 className="title">Hello {user.given_name}, Add a New Hole</h3>
          <input
            className="hole"
            onChange={(e) => setHoleNumber(e.target.value)}
            value={holeNumber}
            type="text"
            placeholder="Hole Number"
          />
          <input
            onChange={(e) => setPar(e.target.value)}
            className="par"
            value={par}
            type="text"
            placeholder="Par"
          />
          <input
            className="strokes"
            type="text"
            placeholder="Strokes"
            value={strokes}
            onChange={(e) => setStrokes(e.target.value)}
          />
          <input
            className="putts"
            type="text"
            placeholder="Total Putts"
            value={putts}
            onChange={(e) => setPutts(e.target.value)}
          />

          <div className="checkbox">
            <input
              className="gir"
              type="checkbox"
              checked={GIR}
              onChange={changeGIR}
            />
            <label>GIR</label>

            <input
              className="fir"
              type="checkbox"
              checked={FIR}
              onChange={changeFIR}
            />
            <label>FIR</label>
          </div>

          <button className="submit" type="submit">
            Add Hole
          </button>
          <Link href = './done'><button className="submit">Finish Round</button></Link>
        </form>
      </div>
    </main>
  );
}
