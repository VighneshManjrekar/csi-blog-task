import { useContext } from "react";
import { Link, useParams } from "react-router-dom";

import { BlogContext } from "./Contexts/blog.context";

const Blog = () => {
  const { blogPosts } = useContext(BlogContext);
  const { id } = useParams();
  const blogPost = blogPosts.find((post) => post.id === id);
  return (
    <>
      {blogPost ? (
        <div className="container my-4">
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="d-flex justify-content-center">
                <img
                  src={blogPost.file}
                  alt="Blog Banner"
                  className="img-fluid mb-3"
                />
              </div>
              <h2 className="mb-3">{blogPost.title}</h2>
              <p>{blogPost.title}</p>
              <p style={{ textAlign: "justify" }}>{blogPost.content}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="container my-5">
          <h1>404 Blog Not Found</h1>
          <Link to="/">Home</Link>
        </div>
      )}
    </>
  );
};

export default Blog;
