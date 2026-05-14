import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import CommentSection from "../components/CommentSection";
import "../styles/postDetail.css";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);

  useEffect(() => {
    API.get(`/posts/${id}`).then((res) => setPost(res.data));
  }, [id]);

  const handleDelete = async () => {
    try {
      await API.delete(`/posts/${id}`);
      navigate("/");
    } catch {
      alert("Error deleting post");
    }
  };

  if (!post) return <p style={{ textAlign: "center", marginTop: "3rem", color: "var(--text-muted)" }}>Loading...</p>;

  const isAuthor = user && post.author._id === user._id;

  return (
    <div>
      <button className="btn-back" onClick={() => navigate("/")}>← Back</button>
      <div className="post-detail">
        <h1 className="post-detail-title">{post.title}</h1>
        <p className="post-detail-meta">
          By <strong>{post.author.username}</strong> &middot;{" "}
          {new Date(post.createdAt).toLocaleDateString("en-IN", {
            day: "numeric", month: "long", year: "numeric",
          })}
        </p>
        {post.tags?.length > 0 && (
          <div className="post-detail-tags">
            {post.tags.map((t, i) => (
              <span key={i} className="tag">#{t}</span>
            ))}
          </div>
        )}
        <p className="post-detail-content">{post.content}</p>
        {isAuthor && (
          <div className="post-detail-actions">
            <button className="btn-edit" onClick={() => navigate(`/edit/${id}`)}>
              ✏️ Edit
            </button>
            <button className="btn-delete" onClick={handleDelete}>
              🗑️ Delete
            </button>
          </div>
        )}
      </div>
      <CommentSection postId={id} />
    </div>
  );
}