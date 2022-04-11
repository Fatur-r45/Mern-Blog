import React, { useEffect, useState } from "react";
import { Link } from "../../components";
import "./detailBlog.scss";
import { useHistory, withRouter } from "react-router";
import Axios from "axios";

const DetailBlog = (props) => {
  const [data, setData] = useState({});
  useEffect(() => {
    const id = props.match.params.id;
    Axios.get(`http://localhost:4000/v1/blog/post/${id}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }, [props]);
  const history = useHistory();
  if (data.author) {
    return (
      <div className="detail-blog-wrapper">
        <img
          className="img-cover"
          src={`http://localhost:4000/${data.image}`}
          alt="thumb"
        />
        <p className="blog-title">{data.title}</p>
        <p className="blog-author">
          {data.author.name} - {data.createdAt}
        </p>
        <p className="blog-body">{data.body}</p>
        <Link title="kembali ke home" onClick={() => history.push("/")} />
      </div>
    );
  }
  return <p>loading data....</p>;
};

export default withRouter(DetailBlog);
