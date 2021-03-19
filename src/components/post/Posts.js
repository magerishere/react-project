import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import "./Posts.css";
export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      searchTitle: "",
      listOfChecked: [],
      message: "",
      checkAll: false,
      paginate: [],
    };
  }

  componentDidMount() {
    axios.defaults.baseURL = "http://127.0.0.1:8000/api";
    this.firstRequest();
  }

  firstRequest = async (message, pageNumber = 1) => {
    const res = await axios.get(`/post?page=${pageNumber}`);
    const paginate = res.data.posts;
    const posts = res.data.posts.data;
    posts.forEach((post) => {
      return (post["isChecked"] = false);
    });
    this.setState({ posts, message, paginate });
  };

  listHanlder = (e) => {
    const posts = this.state.posts;
    posts.forEach((post) => {
      if (post.id == e.target.value) post.isChecked = e.target.checked;
    });
    this.setState({ posts });
  };

  deletePost = async (id) => {
    const res = await axios.delete(`/post/${id}`);
    if (res.data.status === 200) {
      this.firstRequest("حذف شد");
    }
  };

  multiDeletePosts = async () => {
    let listOfChecked = [];
    const { posts } = this.state;
    posts.forEach((post) => {
      if (post.isChecked) listOfChecked.push(post.id);
    });
    if (listOfChecked.length > 0) {
      const res = await axios.post("/post/multidelete", { listOfChecked });
      if (res.data.status === 200)
        this.firstRequest("موارد انتخاب شده حذف شدند");
    }
  };

  checkedAll = () => {
    const { posts, checkAll } = this.state;
    posts.forEach((post) =>
      checkAll ? (post.isChecked = false) : (post.isChecked = true)
    );
    this.setState({ posts, checkAll: !checkAll });
  };

  render() {
    const { searchTitle, posts, message, paginate } = this.state;
    let postsFilter = posts.filter((post) => {
      return post.title.indexOf(searchTitle) !== -1;
    });

    return (
      <>
        <div className="col-md-12">
          {message && (
            <p
              className="alert alert-danger mx-auto text-center col-md-8"
              onClick={() => this.setState({ message: "" })}
            >
              {message}
            </p>
          )}

          <table className="table table-hover col-md-10 mx-auto">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" onClick={this.checkedAll} />
                </th>

                <th>#</th>
                <th>
                  عنوان{" "}
                  <input
                    type="text"
                    placeholder="... جستجو"
                    value={searchTitle}
                    onChange={(e) =>
                      this.setState({ searchTitle: e.target.value })
                    }
                  />
                </th>
                <th>محتوا</th>
                <th>عکس</th>
                <th>ویرایش</th>
                <th>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={this.multiDeletePosts}
                  >
                    حذف انتخاب شده ها
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {postsFilter.map((post) => (
                <tr key={post.id}>
                  <td>
                    <input
                      type="checkbox"
                      value={post.id}
                      onClick={this.listHanlder}
                      checked={post.isChecked}
                    />
                  </td>
                  <td>{post.id}</td>
                  <td>{post.title}</td>
                  <td>{post.content.substr(0, 40)}</td>
                  <td>
                    <img
                      width="50"
                      src={`http://127.0.0.1:8000/images/${post.image}`}
                      alt="image"
                    />
                  </td>
                  <td>
                    <Link to={`/post/${post.id}/edit`}>
                      <button type="button" className="btn btn-primary">
                        ویرایش
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => this.deletePost(post.id)}
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <Pagination
              activePage={paginate.current_page}
              itemsCountPerPage={paginate.per_page}
              totalItemsCount={paginate.total}
              onChange={(pageNumber) => this.firstRequest("", pageNumber)}
            />
            <span>
              <p>صفحه {paginate.current_page}</p>
            </span>
          </div>
        </div>
      </>
    );
  }
}
