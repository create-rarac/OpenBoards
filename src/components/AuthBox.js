import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function AuthBox({ username, setUsername }) {
  const [input, setInput] = useState('');
  const [email, setEmail] = useState('');

  const handleGuestLogin = () => {
    const guestName = input.trim() || `Guest${Math.floor(Math.random() * 1000)}`;
    setUsername(guestName);
    localStorage.setItem('ff-username', guestName);
  };

  const handleEmailLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert(error.message);
    else alert('Check your email for a login link!');
  };

  const handleLogout = () => {
    setUsername('');
    localStorage.removeItem('ff-username');
    supabase.auth.signOut();
  };

  return (
    <div className="ff-authbox">
      {username ? (
        <>
          <span>Logged in as <b>{username}</b></span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <div>
          <input
            placeholder="Guest username"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="ff-input"
          />
          <button onClick={handleGuestLogin}>Login as Guest</button>
          <br />
          <input
            placeholder="Email for magic link"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="ff-input"
            type="email"
          />
          <button onClick={handleEmailLogin}>Login with Email</button>
        </div>
      )}
    </div>
  );
}