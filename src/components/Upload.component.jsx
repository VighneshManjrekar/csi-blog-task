import { useState, useContext, useEffect } from "react";
import imageCompression from "browser-image-compression";
import { uid } from "uid";
import { BlogContext } from "./Contexts/blog.context";
import { useParams } from "react-router-dom";

const Upload = () => {
  const { blogPosts, addBlogPosts } = useContext(BlogContext);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    file: null,
  });

  useEffect(() => {
    const initialData = blogPosts.find((post) => post.id === id);
    setFormData({
      title: initialData ? initialData.title : "",
      content: initialData ? initialData.content : "",
      file: initialData ? initialData.file : null,
    });
  }, [blogPosts, id]);

  const updateFormValue = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormValue(name, value);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      alert("Please upload a valid image file");
      e.target.value = null;
      e.target.reset();
      return;
    }
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 720,
      useWebWorker: true,
    };
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target.result;
      updateFormValue("file", base64Data);
    };
    try {
      const compressedFile = await imageCompression(file, options);
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlogPost = {
      title: formData.title,
      content: formData.content,
      file: formData.file,
      dateUpdated: new Date().toLocaleString(),
    };
    newBlogPost.id = id ? id : uid();

    if (!id) {
      blogPosts.push(newBlogPost);
    } else {
      const index = blogPosts.findIndex((post) => post.id === id);
      blogPosts[index] = newBlogPost;
    }
    addBlogPosts(blogPosts);
    e.target.reset();
    setFormData({ title: "", content: "", file: null });
  };

  return (
    <div className="container my-5 d-flex flex-column align-items-center justify-content-center">
      <h1 className="text-center">Upload Blog</h1>
      <form onSubmit={handleSubmit} className="w-100">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">
            File Upload
          </label>
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Upload;
