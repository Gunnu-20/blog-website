import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import "../styles/comment.css";

export default function CommentSection({ postId }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    API.get(`/posts/${postId}/comments`).then((res) => setComments(res.data));
  }, [postId]);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    try {
      const res = await API.post(`/posts/${postId}/comments`, { content });
      setComments([...comments, res.data]);
      setContent("");
    } catch {
      alert("Error posting comment");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete comment?")) return;
    try {
      await API.delete(`/posts/${postId}/comments/${id}`);
      setComments(comments.filter((c) => c._id !== id));
    } catch {
      alert("Error deleting comment");
    }
  };

  return (
    <div className="comment-section">
      <h3>💬 Comments ({comments.length})</h3>

      {user ? (
        <div className="comment-form">
          <textarea
            placeholder="Write a comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className="comment-submit-btn" onClick={handleSubmit}>
            Post Comment
          </button>
        </div>
      ) : (
        <p className="login-to-comment">
          <Link to="/login">Login</Link> to leave a comment.
        </p>
      )}

      <div className="comment-list">
        {comments.map((c) => (
          <div key={c._id} className="comment-item">
            <span className="comment-author">{c.author.username}</span>
            <span className="comment-date">
              {new Date(c.createdAt).toLocaleDateString("en-IN", {
                day: "numeric", month: "short", year: "numeric",
              })}
            </span>
            <p className="comment-content">{c.content}</p>
            {user && user._id === c.author._id && (
              <button className="comment-delete-btn" onClick={() => handleDelete(c._id)}>
                Delete
              </button>
            )}
          </div>
        ))}
        {comments.length === 0 && (
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            No comments yet. Be the first!
          </p>
        )}
      </div>
    </div>
  );
}