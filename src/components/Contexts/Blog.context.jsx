import { createContext, useState, useEffect } from "react";

const deleteBlogHandler = (blogPosts, postToDelete) => {
  const updatedBlogPosts = blogPosts.filter(
    (post) => post.id !== postToDelete.id
  );
  localStorage.setItem("blogPosts", JSON.stringify(updatedBlogPosts));
  return updatedBlogPosts;
};

export const BlogContext = createContext({
  blogPosts: [],
  addBlogPosts: () => {},
  deleteBlogPost: () => {},
});

export const BlogProvider = ({ children }) => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const savedBlogPosts = JSON.parse(localStorage.getItem("blogPosts"));
    setBlogPosts(savedBlogPosts || []);
  }, []);

  const addBlogPosts = (blogPosts) => {
    setBlogPosts(blogPosts);
    localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
  };
  const deleteBlogPost = (blogPosts, postToDelete) => {
    setBlogPosts(deleteBlogHandler(blogPosts, postToDelete));
  };

  const value = {
    blogPosts,
    addBlogPosts,
    deleteBlogPost,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};
