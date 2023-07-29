import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BlogContext } from "./Contexts/blog.context";

const Home = () => {
  const { blogPosts, deleteBlogPost } = useContext(BlogContext);
  const [sortOption, setSortOption] = useState("date");

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedBlogPosts = [...blogPosts];
  switch (sortOption) {
    case "title A-Z":
      sortedBlogPosts.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "title Z-A":
      sortedBlogPosts.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "date":
      sortedBlogPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    default:
      "break";
  }

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between flex-sm-row">
        <h1 className="text-center">Blog Posts</h1>
        {sortedBlogPosts.length > 1 && (
          <select
            className="form-select w-auto w-sm-25"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="date">Date</option>
            <option value="title A-Z">Title A-Z</option>
            <option value="title Z-A">Title Z-A</option>
          </select>
        )}
      </div>
      <div className="my-2 d-flex flex-wrap justify-content-center justify-content-lg-start align-items-center">
        {sortedBlogPosts &&
          sortedBlogPosts.map((post, index) => (
            <div
              key={index}
              className="card my-3 mx-2"
              style={{ width: "18rem" }}
            >
              <img
                width={260}
                height={140}
                src={post.file}
                alt={post.title}
                className="card-img-top p-0"
                style={{ objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{post.title.substring(0, 30)}</h5>
                <p
                  className="card-text"
                  style={{ textAlign: "justify", height: "100px" }}
                >
                  {post.content.substring(0, 90)}...
                </p>
                <div className="d-flex justify-content-between">
                  <Link to={`blog/${post.id}`} className="btn btn-primary">
                    Read
                  </Link>
                  <div className="d-flex justify-content-around">
                    <Link
                      to={`blog/edit/${post.id}`}
                      className="btn btn-warning  me-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => deleteBlogPost(blogPosts, post)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
