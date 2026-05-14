import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import PostCard from "../components/PostCard";
import "../styles/home.css";

export default function Home() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/posts").then((res) => {
      setPosts(res.data);
      setLoading(false);
    });
  }, []);

  const handleDelete = (id) => setPosts(posts.filter((p) => p._id !== id));

  return (
    <div>
      <div className="home-header">
        <h1>Welcome to BlogHub</h1>
        <p>Discover stories, ideas, and voices from around the world.</p>
      </div>
      {user && (
        <Link to="/create" className="create-btn">+ Write a Post</Link>
      )}
      {loading ? (
        <p className="loading-text">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="empty-text">No posts yet. Be the first to write one!</p>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}