import React, { useState, useEffect } from "react";

import axios from "axios";

export default function Create() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState({});
  const [message, setMessage] = useState("");
  const [categories, setCategories] = useState([]);

  axios.defaults.baseURL = "http://127.0.0.1:8000/api";
  const firstRequest = async () => {
    const res = await axios.get("/category");
    setCategories(res.data.categories);
  };
  useEffect(() => {
    firstRequest();
  }, []);
  const createPost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", file, file.name);
    formData.append("content", content);
    for (var p of formData) {
      console.log(p);
    }
    const res = await axios.post("/post", formData);
    if (res.data.status === 200) {
      setMessage("با موفقیت ثبت شد. دیدن مطلب");
      setTitle("");
      setCategory("");
      setImage("");
      setContent("");
      setFile({});
    }
  };
  const handlerFile = (e) => {
    setImage(e.target.value);
    setFile(e.target.files[0]);
  };
  return (
    <div className="col-md-12">
      <h1 className="float-right">ایجاد پست</h1>

      <section className="col-md-5 mx-auto">
        <form onSubmit={createPost} encType="multi-part/data">
          {message && (
            <div className="pt-3">
              <h5 className="alert alert-success text-center">{message} </h5>
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
              value={category}
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
            ایجاد
          </button>
        </form>
      </section>
    </div>
  );
}
