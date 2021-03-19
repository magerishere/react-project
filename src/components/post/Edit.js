import React, { useState, useEffect } from "react";
import axios from "axios";
export default function Edit({ match }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState({});
  const [message, setMessage] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  axios.defaults.baseURL = "http://127.0.0.1:8000/api";

  const handlerFile = (e) => {
    setImage(e.target.value);
    setFile(e.target.files[0]);
  };

  const requestData = async () => {
    const res = await axios.get(`/post/${match.params.id}`);
    const data = res.data.post;
    setTitle(data.title);
    setContent(data.content);
    setCurrentImage(data.image);
    setCategory(res.data.category);
    setCategories(res.data.categories);
  };

  useEffect(() => {
    requestData();
  }, []);

  const editPost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    if (image) formData.append("image", file, file.name);
    formData.append("content", content);
    const res = await axios.post(`/post/update/${match.params.id}`, formData);

    if (res.data.status === 200) {
      setMessage("با موفقیت ویرایش شد.");
      setTitle("");
      setCategory("");
      setImage("");
      setContent("");
      setFile({});
    }
  };
  return (
    <div className="col-md-12">
      <h1 className="float-right">ویرایش</h1>
      <section>
        <div className="row">
          <div className="col-md-4">
            <img
              width="300px"
              src={`http://127.0.0.1:8000/images/${currentImage}`}
            />
          </div>
          <div className="col-md-5">
            <form onSubmit={editPost} encType="multi-part/data">
              {message && (
                <div className="pt-3">
                  <h5 className="alert alert-success text-center">
                    {message}{" "}
                  </h5>
                </div>
              )}
              <div className="form-group">
                <label htmlFor="title">عنوان</label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">دسته بندی</label>
                <select
                  className="form-control"
                  id="category"
                  value={category.id}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="image">عکس</label>
                <input
                  type="file"
                  className="form-control-file"
                  id="image"
                  value={image}
                  onChange={handlerFile}
                />
              </div>
              <div className="form-group">
                <label htmlFor="content">محتوا</label>
                <textarea
                  className="form-control"
                  id="content"
                  rows="6"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary form-control">
                ویرایش
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}