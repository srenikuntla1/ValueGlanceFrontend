import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const GetBlogPost = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        setError('Error fetching the post');
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:5000/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/posts');
    } catch (error) {
      setError('Error deleting the post');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <small>Author ID: {post.user_id}</small>
      <div>
        <p>Edit Post</p>
        <button onClick={handleDelete}>Delete Post</button>
      </div>
    </div>
  );
};

export default GetBlogPost;