import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function ThreadTable({ categoryId, onOpen, username }) {
  const [threads, setThreads] = useState([]);
  const [newThread, setNewThread] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchThreads = async () => {
      let { data } = await supabase
        .from('threads')
        .select('*, replies(count)')
        .eq('category_id', categoryId)
        .order('created_at', { ascending: false });
      setThreads(data || []);
    };
    if (categoryId) fetchThreads();
  }, [categoryId]);

  const handleChange = e => {
    setNewThread({ ...newThread, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!username || !newThread.title.trim()) return;
    await supabase.from('threads').insert([
      {
        category_id: categoryId,
        title: newThread.title,
        content: newThread.content,
        username,
      },
    ]);
    setNewThread({ title: '', content: '' });
    let { data } = await supabase
      .from('threads')
      .select('*, replies(count)')
      .eq('category_id', categoryId)
      .order('created_at', { ascending: false });
    setThreads(data || []);
  };

  return (
    <div>
      <table className="ff-threadtable">
        <thead>
          <tr>
            <th>Thread</th>
            <th>Replies</th>
            <th>Started by</th>
          </tr>
        </thead>
        <tbody>
          {threads.map(thread => (
            <tr key={thread.id} onClick={() => onOpen(thread.id)} className="ff-threadrow">
              <td>[Thread] {thread.title}</td>
              <td>{thread.replies?.length || 0}</td>
              <td>{thread.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {username && (
        <form onSubmit={handleSubmit} className="ff-newthreadform">
          <h3>Create New Thread</h3>
          <input name="title" value={newThread.title} onChange={handleChange} placeholder="Title" className="ff-input" />
          <textarea name="content" value={newThread.content} onChange={handleChange} placeholder="Content" className="ff-input" />
          <button type="submit">Post Thread</button>
        </form>
      )}
    </div>
  );
}