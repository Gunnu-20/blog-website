import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../styles/createPost.css";

export default function CreatePost() {
  const [form, setForm] = useState({ title: "", content: "", tags: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const tags = form.tags.split(",").map((t) => t.trim()).filter(Boolean);
      await API.post("/posts", { ...form, tags });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Error creating post");
    }
  };

  return (
    <div className="create-post-page">
      <h2>✍️ Write a New Post</h2>
      <form className="post-form" onSubmit={handleSubmit}>
        {error && <div className="error-msg">{error}</div>}
        <div>
          <label>Title</label>
          <input type="text" name="title" value={form.title}
            onChange={handleChange} required placeholder="Your post title..." />
        </div>
        <div>
          <label>Content</label>
          <textarea name="content" value={form.content}
            onChange={handleChange} required placeholder="Write your content here..." />
        </div>
        <div>
          <label>Tags (comma-separated)</label>
          <input type="text" name="tags" value={form.tags}
            onChange={handleChange} placeholder="tech, lifestyle, travel" />
        </div>
        <button className="submit-btn" type="submit">Publish Post</button>
      </form>
    </div>
  );
}