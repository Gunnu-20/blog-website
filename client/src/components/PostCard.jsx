import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import "../styles/postCard.css";

export default function PostCard({ post, onDelete }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAuthor = user && post.author._id === user._id;

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await API.delete(`/posts/${post._id}`);
      onDelete(post._id);
    } catch (err) {
      alert("Error deleting post");
    }
  };

  return (
    <div className="post-card">
      <Link to={`/post/${post._id}`} className="post-card-title">
        {post.title}
      </Link>
      <div className="post-card-meta">
        By <strong>{post.author.username}</strong> &middot;{" "}
        {new Date(post.createdAt).toLocaleDateString("en-IN", {
          year: "numeric", month: "short", day: "numeric",
        })}
      </div>
      <p className="post-card-excerpt">{post.content}</p>
      {post.tags?.length > 0 && (
        <div className="post-card-tags">
          {post.tags.map((tag, i) => <span key={i} className="tag">#{tag}</span>)}
        </div>
      )}
      {isAuthor && (
        <div className="post-card-actions">
          <button className="btn-edit" onClick={() => navigate(`/edit/${post._id}`)}>
            ✏️ Edit
          </button>
          <button className="btn-delete" onClick={handleDelete}>
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
}