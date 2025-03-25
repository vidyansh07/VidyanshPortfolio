import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { Calendar, Clock, MessageCircle, Share2, Heart } from 'lucide-react';
import { blogApi } from '../services/api';

const BlogDetailsPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        setLoading(true);
        const blogData = await blogApi.getBlog(id);
        setBlog(blogData);
        
        // Fetch comments for this blog
        const commentsData = await blogApi.getBlogComments(id);
        setComments(commentsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  const handleLike = async () => {
    try {
      await blogApi.likeBlog(id);
      setLiked(!liked);
      setBlog(prev => ({
        ...prev,
        likes: (prev.likes || 0) + (liked ? -1 : 1)
      }));
    } catch (err) {
      console.error('Error liking blog:', err);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      const newComment = await blogApi.addComment({
        blog_id: id,
        content: comment,
        name: 'Anonymous',
        email: 'anonymous@example.com'
      });
      setComments([...comments, newComment]);
      setComment('');
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 w-3/4 mx-auto mb-4" />
          <div className="h-6 bg-gray-200 w-1/2 mx-auto mb-4" />
          <div className="h-64 bg-gray-200 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 text-center text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-12"
    >
      <article className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-500 mb-6">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              {new Date(blog.created_at).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              {blog.readTime || 5} min read
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle size={16} />
              {comments.length} comments
            </div>
          </div>
        </header>

        {/* Cover Image */}
        <img
          src={blog.image_url || "/api/placeholder/800/400"}
          alt={blog.title}
          className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
        />

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-12">
          {blog.content}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {blog.tags.split(',').map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Engagement */}
        <div className="flex items-center justify-between border-t border-b py-4 mb-8">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 ${
              liked ? 'text-red-500' : 'text-gray-500'
            }`}
          >
            <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
            {blog.likes || 0}
          </button>
          <button className="flex items-center gap-2 text-gray-500">
            <Share2 size={20} />
            Share
          </button>
        </div>

        {/* Comments Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Comments</h2>
          
          {/* Comment Form */}
          <form onSubmit={handleComment} className="mb-8">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Leave a comment..."
              className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px] mb-4"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Post Comment
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-100 py-4">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">{comment.name}</h4>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>
    </motion.div>
  );
};

export default BlogDetailsPage;