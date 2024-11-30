import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MessageCircle, Share2, ThumbsUp, Heart } from 'lucide-react';



const BlogPostSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="flex gap-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
        </div>
      </div>
      <div className="w-full h-64 bg-gray-200 rounded animate-pulse" />
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded animate-pulse w-full" />
        ))}
      </div>
    </div>
  );
};

// Comment Component
const Comment = ({ comment }) => {
  return (
    <div className="border-b border-gray-100 py-4">
      <div className="flex items-start gap-4">
        <img
          src={comment.author.avatar || "/api/placeholder/40/40"}
          alt={comment.author.name}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium">{comment.author.name}</h4>
            <span className="text-sm text-gray-500">{comment.date}</span>
          </div>
          <p className="text-gray-600">{comment.content}</p>
          <div className="flex items-center gap-4 mt-2">
            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
              <ThumbsUp size={14} />
              {comment.likes}
            </button>
            <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
              <MessageCircle size={14} />
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Related Post Card
const RelatedPostCard = ({ post }) => {
  return (
    <div className="border rounded-lg hover:shadow-lg transition-shadow">
      <div className="p-4">
        <img
          src={post.coverImage || "/api/placeholder/400/200"}
          alt={post.title}
          className="w-full h-32 object-cover rounded-lg mb-4"
        />
        <h3 className="font-medium mb-2 line-clamp-2">{post.title}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-6 4h6a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V9a2 2 0 012-2h2z"
            />
          </svg>
          {post.date}
        </div>
      </div>
    </div>
  );
};

// Blog Post Component
const BlogPost = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState('');

  // Sample blog post data
  const post = {
    id: 1,
    title: "Understanding React Server Components",
    excerpt: "A deep dive into React Server Components and how they can improve your application's performance.",
    content: `
      React Server Components represent a fundamental shift in how we build React applications.
      They enable us to render components on the server while maintaining the interactivity
      and dynamism that React is known for.
      
      In this comprehensive guide, we'll explore:
      
      1. What are React Server Components?
      2. How do they differ from traditional React components?
      3. Benefits and trade-offs
      4. Implementation strategies
      5. Best practices and common pitfalls
      
      [Rest of the blog post content...]
    `,
    coverImage: "/api/placeholder/800/400",
    date: "Mar 15, 2024",
    readTime: 8,
    tags: ["React", "Web Development", "Performance"],
    author: {
      name: "John Doe",
      avatar: "/api/placeholder/64/64",
      bio: "Senior Frontend Developer | React Enthusiast"
    },
    likes: 42,
    comments: [
      {
        id: 1,
        author: {
          name: "Jane Smith",
          avatar: "/api/placeholder/40/40"
        },
        date: "Mar 16, 2024",
        content: "Great article! The explanation about hydration really helped me understand the concept better.",
        likes: 5
      },
      {
        id: 2,
        author: {
          name: "Mike Johnson",
          avatar: "/api/placeholder/40/40"
        },
        date: "Mar 16, 2024",
        content: "Would love to see a follow-up post about implementing RSC with Next.js!",
        likes: 3
      }
    ]
  };

  // Sample related posts
  const relatedPosts = [
    {
      id: 2,
      title: "Optimizing React Performance",
      excerpt: "Learn advanced techniques for optimizing your React applications.",
      coverImage: "/api/placeholder/400/200",
      date: "Mar 12, 2024"
    },
    {
      id: 3,
      title: "Building with Next.js 14",
      excerpt: "Exploring the latest features in Next.js 14.",
      coverImage: "/api/placeholder/400/200",
      date: "Mar 10, 2024"
    },
    {
      id: 4,
      title: "Modern CSS Techniques",
      excerpt: "Advanced CSS patterns for modern web applications.",
      coverImage: "/api/placeholder/400/200",
      date: "Mar 8, 2024"
    }
  ];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleComment = (e) => {
    e.preventDefault();
    // Handle comment submission
    console.log('Comment submitted:', comment);
    setComment('');
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <BlogPostSkeleton />
      </div>
    );
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
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-500 mb-6">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              {post.date}
            </div>
            <div className="flex items-center gap-1">
              <Clock size={16} />
              {post.readTime} min read
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle size={16} />
              {post.comments.length} comments
            </div>
          </div>
          <div className="flex items-center gap-4">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="font-medium">{post.author.name}</h3>
              <p className="text-sm text-gray-500">{post.author.bio}</p>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
        />

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-12">
          {post.content}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
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
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-2 ${
              liked ? 'text-red-500' : 'text-gray-500'
            }`}
          >
            <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
            {post.likes + (liked ? 1 : 0)}
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
            {post.comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        </section>

        {/* Related Posts */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <RelatedPostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      </article>

      {/* Thank You Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-16"
      >
        <p className="text-gray-600">
          Thanks for reading! Don't forget to share if you found this helpful.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default BlogPost;