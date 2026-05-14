import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
import "../styles/createPost.css";

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "", tags: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    API.get(`/posts/${id}`).then((res) => {
      const { title, content, tags } = res.data;
      setForm({ title, content, tags: tags?.join(", ") || "" });
    });
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const tags = form.tags.split(",").map((t) => t.trim()).filter(Boolean);
      await API.put(`/posts/${id}`, { ...form, tags });
      navigate(`/post/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Error updating post");
    }
  };

  return (
    <div className="create-post-page">
      <h2>✏️ Edit Post</h2>
      <form className="post-form" onSubmit={handleSubmit}>
        {error && <div className="error-msg">{error}</div>}
        <div>
          <label>Title</label>
          <input type="text" name="title" value={form.title}
            onChange={handleChange} required />
        </div>
        <div>
          <label>Content</label>
          <textarea name="content" value={form.content}
            onChange={handleChange} required />
        </div>
        <div>
          <label>Tags (comma-separated)</label>
          <input type="text" name="tags" value={form.tags}
            onChange={handleChange} />
        </div>
        <button className="submit-btn" type="submit">Update Post</button>
      </form>
    </div>
  );
}