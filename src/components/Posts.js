import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Posts = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/posts');
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://127.0.0.1:5000/posts',
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchPosts();
      setTitle('');
      setContent('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Posts</h2>
      <form onSubmit={handleCreatePost} className="mb-8">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Create Post
        </button>
      </form>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="bg-white p-4 rounded-lg shadow-md">
            <p>
              <h3 className="text-2xl font-bold mb-2 text-blue-600">{post.title}</h3>
            </p>
            <p className="text-gray-700 mb-2">{post.content}</p>
            <small className="text-gray-500">Author ID: {post.user_id}</small>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => navigate(`/posts/${post.id}/edit`)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeletePost(post.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;