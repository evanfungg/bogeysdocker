'use client'
import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link'
import './styles.css'


export default function CreateRoundPage() {
  const { user, error, isLoading } = useUser();
  const [roundName, setRoundName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !roundName) return;

    try {
      const response = await fetch("/api/round", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roundName }),
      });

      if (!response.ok) throw new Error('Something went wrong');
      
      alert('Round created successfully');
      window.location.href = './addHole';
    } catch (error) {
      console.error('Failed to create round', error);
      alert('Failed to create round');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <main className="main">
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h3 className="title">Hello {user.given_name}, Enter Course Name</h3>
        <input
          className="round"
          onChange={(e) => setRoundName(e.target.value)}
          value={roundName}
          type="text"
          placeholder="Round Name"
        />
       

        <button className="submit" type="submit">
          Create Round
        </button>
      </form>
    </div>
  </main>
    
  );
}
