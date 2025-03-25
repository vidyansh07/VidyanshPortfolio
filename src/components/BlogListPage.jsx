import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MessageCircle, ThumbsUp } from 'lucide-react';
import { useBlogs } from '../hooks/useBlogs';

const BlogListPage = () => {
  const { blogs, loading, error, fetchBlogs } = useBlogs();
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(filter.toLowerCase()) ||
    blog.category.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-6 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-12">Error: {error}</div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-12 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Blog Posts</h1>
          <input 
            type="text"
            placeholder="Filter blogs by title or category..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {filteredBlogs.length === 0 ? (
          <div className="text-center text-gray-500 mt-12">
            No blogs found matching your filter.
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBlogs.map((blog) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link to={`/blog/${blog.id}`} className="block">
                  <div className="p-6">
                    <img
                      src={blog.image_url || "/api/placeholder/800/400"}
                      alt={blog.title}
                      className="w-full h-48 object-cover"
                    />
                    <h2 className="text-2xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {blog.content.slice(0, 200)}...
                    </p>
                    <div className="flex items-center justify-between text-gray-500 text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          {new Date(blog.created_at).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp size={16} />
                          {blog.likes || 0}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle size={16} />
                          {blog.comments?.length || 0}
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                        {blog.category}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BlogListPage;

























// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Calendar, Clock, MessageCircle, Share2, ThumbsUp, Heart } from 'lucide-react';
// import { useBlogs } from '../hooks/useBlogs';

// const BlogPostSkeleton = () => {
//   return (
//     <div className="space-y-8">
//       <div className="space-y-4">
//         <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4" />
//         <div className="flex gap-4">
//           <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
//           <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
//         </div>
//       </div>
//       <div className="w-full h-64 bg-gray-200 rounded animate-pulse" />
//       <div className="space-y-4">
//         {[...Array(6)].map((_, i) => (
//           <div key={i} className="h-4 bg-gray-200 rounded animate-pulse w-full" />
//         ))}
//       </div>
//     </div>
//   );
// };

// // Comment Component
// const Comment = ({ comment }) => {
//   return (
//     <div className="border-b border-gray-100 py-4">
//       <div className="flex items-start gap-4">
//         <img
//           src={comment.author.avatar || "/api/placeholder/40/40"}
//           alt={comment.author.name}
//           className="w-10 h-10 rounded-full"
//         />
//         <div className="flex-1">
//           <div className="flex items-center justify-between mb-1">
//             <h4 className="font-medium">{comment.author.name}</h4>
//             <span className="text-sm text-gray-500">{comment.date}</span>
//           </div>
//           <p className="text-gray-600">{comment.content}</p>
//           <div className="flex items-center gap-4 mt-2">
//             <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
//               <ThumbsUp size={14} />
//               {comment.likes}
//             </button>
//             <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600">
//               <MessageCircle size={14} />
//               Reply
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Related Post Card
// const RelatedPostCard = ({ post }) => {
//   return (
//     <div className="border rounded-lg hover:shadow-lg transition-shadow">
//       <div className="p-4">
//         <img
//           src={post.coverImage || "/api/placeholder/400/200"}
//           alt={post.title}
//           className="w-full h-32 object-cover rounded-lg mb-4"
//         />
//         <h3 className="font-medium mb-2 line-clamp-2">{post.title}</h3>
//         <div className="flex items-center gap-2 text-sm text-gray-500">
//           <Calendar size={16} />
//           {new Date(post.date).toLocaleDateString()}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Blog Post Component
// const BlogPost = ({ post }) => {
//   const [liked, setLiked] = useState(false);
//   const [comment, setComment] = useState('');

//   const handleComment = (e) => {
//     e.preventDefault();
//     // Handle comment submission
//     console.log('Comment submitted:', comment);
//     setComment('');
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen bg-gray-50 py-12"
//     >
//       <article className="max-w-4xl mx-auto px-4">
//         {/* Header */}
//         <header className="mb-8">
//           <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
//           <div className="flex flex-wrap items-center gap-4 text-gray-500 mb-6">
//             <div className="flex items-center gap-1">
//               <Calendar size={16} />
//               {new Date(post.created_at).toLocaleDateString()}
//             </div>
//             <div className="flex items-center gap-1">
//               <Clock size={16} />
//               {post.readTime} min read
//             </div>
//             <div className="flex items-center gap-1">
//               <MessageCircle size={16} />
//               {post.comments ? post.comments.length : 0} comments
//             </div>
//           </div>
//           <div className="flex items-center gap-4">
//             <img
//               src={post.author.avatar || "/api/placeholder/64/64"}
//               alt={post.author.name}
//               className="w-12 h-12 rounded-full"
//             />
//             <div>
//               <h3 className="font-medium">{post.author}</h3>
//               <p className="text-sm text-gray-500">{post.authorBio}</p>
//             </div>
//           </div>
//         </header>

//         {/* Cover Image */}
//         <img
//           src={post.coverImage || "/api/placeholder/800/400"}
//           alt={post.title}
//           className="w-full h-64 md:h-96 object-cover rounded-xl mb-8"
//         />

//         {/* Content */}
//         <div className="prose prose-lg max-w-none mb-12">
//           {post.content}
//         </div>

//         {/* Tags */}
//         <div className="flex flex-wrap gap-2 mb-8">
//           {post.tags.split(',').map((tag) => (
//             <span
//               key={tag}
//               className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
//             >
//               {tag}
//             </span>
//           ))}
//         </div>

//         {/* Engagement */}
//         <div className="flex items-center justify-between border-t border-b py-4 mb-8">
//           <button
//             onClick={() => setLiked(!liked)}
//             className={`flex items-center gap-2 ${
//               liked ? 'text-red-500' : 'text-gray-500'
//             }`}
//           >
//             <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
//             {post.likes + (liked ? 1 : 0)}
//           </button>
//           <button className="flex items-center gap-2 text-gray-500">
//             <Share2 size={20} />
//             Share
//           </button>
//         </div>

//         {/* Comments Section */}
//         <section className="mb-12">
//           <h2 className="text-2xl font-bold mb-6">Comments</h2>
          
//           {/* Comment Form */}
//           <form onSubmit={handleComment} className="mb-8">
//             <textarea
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               placeholder="Leave a comment..."
//               className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px] mb-4"
//             />
//             <button
//               type="submit"
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Post Comment
//             </button>
//           </form>

//           {/* Comments List */}
//           <div className="space-y-4">
//             {post.comments && post.comments.map((comment) => (
//               <Comment key={comment.id} comment={comment} />
//             ))}
//           </div>
//         </section>

//         {/* Related Posts */}
//         <section>
//           <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
//           <div className="grid md:grid-cols-3 gap-6">
//             {post.relatedPosts && post.relatedPosts.map((relatedPost) => (
//               <RelatedPostCard key={relatedPost.id} post={relatedPost} />
//             ))}
//           </div>
//         </section>
//       </article>

//       {/* Thank You Message */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.5 }}
//         className="text-center mt-16"
//       >
//         <p className="text-gray-600">
//           Thanks for reading! Don't forget to share if you found this helpful.
//         </p>
//       </motion.div>
//     </motion.div>
//   );
// };

// const BlogList = () => {
//   const { blogs, loading, error, fetchBlogs } = useBlogs();

//   useEffect(() => {
//     fetchBlogs();
//   }, [fetchBlogs]);

//   if (loading) {
//     return (
//       <div className="max-w-4xl mx-auto px-4 py-12">
//         <BlogPostSkeleton />
//       </div>
//     );
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-12">
//       {blogs.map((post) => (
//         <BlogPost key={post.id} post={post} />
//       ))}
//     </div>
//   );
// };

// export default BlogList;