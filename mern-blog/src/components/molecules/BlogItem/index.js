import React from "react";
import { Button, Gap } from "../..";
import "./BlogItem.scss";
import { useHistory } from "react-router";

const BlogItem = (props) => {
  const history = useHistory();
  const { image, title, name, date, body, onDelete, _id } = props;
  return (
    <div className="blog-item">
      <img className="image-thumb" src={image} alt="post" />
      <div className="content-detail">
        <div className="title-wrapper">
          <p className="title">{title}</p>
          <div className="edit-wrapper">
            <p
              className="edit"
              onClick={() => history.push(`/create-blog/${_id}?`)}
            >
              Edit
            </p>
            |{" "}
            <p className="delete" onClick={() => onDelete(_id)}>
              Delete
            </p>
          </div>
        </div>
        <div className="author">
          <div className="lebar">
            <div className="nama">{name}</div>
          </div>
          <p>{date}</p>
        </div>
        <p className="body">{body}</p>
        <Gap height={20} />
        <Button
          title="view detail"
          onClick={() => history.push(`/detail-blog/${_id}`)}
        />
      </div>
    </div>
  );
};

export default BlogItem;
