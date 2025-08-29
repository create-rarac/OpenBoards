import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function ThreadView({ threadId, onBack, username }) {
  const [thread, setThread] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    const fetchThread = async () => {
      let { data } = await supabase.from('threads').select('*').eq('id', threadId).single();
      setThread(data);
    };
    const fetchReplies = async () => {
      let { data } = await supabase
        .from('replies')
        .select('*')
        .eq('thread_id', threadId)
        .order('created_at', { ascending: true });
      setReplies(data || []);
    };
    if (threadId) {
      fetchThread();
      fetchReplies();
    }
  }, [threadId]);

  const handleReply = async e => {
    e.preventDefault();
    if (!replyContent.trim() || !username) return;
    await supabase.from('replies').insert([
      {
        thread_id: threadId,
        content: replyContent,
        username,
      },
    ]);
    setReplyContent('');
    let { data } = await supabase
      .from('replies')
      .select('*')
      .eq('thread_id', threadId)
      .order('created_at', { ascending: true });
    setReplies(data || []);
  };

  return (
    <div className="ff-threadview">
      <button onClick={onBack}>Back to Threads</button>
      {thread && (
        <div className="ff-threadmain">
          <h2>{thread.title}</h2>
          <div className="ff-threadcontent">{thread.content}</div>
          <div className="ff-threadmeta">Posted by {thread.username} at {thread.created_at}</div>
        </div>
      )}
      <h3>Replies</h3>
      <div className="ff-replies">
        {replies.map(reply => (
          <div key={reply.id} className="ff-reply">
            <div className="ff-replymeta">{reply.username} @ {reply.created_at}</div>
            <div className="ff-replycontent">{reply.content}</div>
          </div>
        ))}
      </div>
      {username && (
        <form onSubmit={handleReply} className="ff-replyform">
          <textarea value={replyContent} onChange={e => setReplyContent(e.target.value)} placeholder="Your reply..." className="ff-input" />
          <button type="submit">Post Reply</button>
        </form>
      )}
    </div>
  );
}