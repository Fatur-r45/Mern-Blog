import { Button, Gap, Input, Link, TextArea, Upload } from "../../components";
import "./createBlog.scss";
import { useHistory, withRouter } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import {
  postToAPI,
  setForm,
  setImgPreview,
  setLoading,
  updateToAPI,
} from "../../config/redux/action";
import { useEffect, useState } from "react";
import Axios from "axios";

const CreateBlog = (props) => {
  const { form, imgPreview, loading } = useSelector(
    (state) => state.createBlogReducer
  );
  const { title, body } = form;
  const [isUpdate, setIsUpdate] = useState(false);
  const dispatch = useDispatch();
  // const [title, setTitle] = useState("");
  // const [body, setBody] = useState("");
  // const [image, setImage] = useState("");
  // const [imagePreview, setImagePreview] = useState(null);
  const history = useHistory();
  useEffect(() => {
    console.log("params: ", props);
    const id = props.match.params.id;
    if (id) {
      setIsUpdate(true);
      Axios.get(`http://localhost:4000/v1/blog/post/${id}`)
        .then((res) => {
          const data = res.data.data;
          console.log("response: ", data);
          dispatch(setForm("title", data.title));
          dispatch(setForm("body", data.body));
          dispatch(setForm("image", data.image));
          dispatch(setImgPreview(`http://localhost:4000/${data.image}`));
        })
        .catch((err) => {
          console.log("error: ", err);
        });
    } else {
      setIsUpdate(false);
      dispatch(setForm("title", ""));
      dispatch(setForm("body", ""));
      dispatch(setForm("image", ""));
      dispatch(setImgPreview(""));
    }
  }, [dispatch, props, isUpdate]);

  const onSubmit = (event) => {
    event.preventDefault();
    const id = props.match.params.id;
    if (isUpdate) {
      console.log("update-data");
      updateToAPI(form, id);
    } else {
      console.log("create-data");
      postToAPI(form);
    }
    dispatch(setLoading(true));
    setTimeout(function () {
      dispatch(setLoading(false));
      history.push("/");
    }, 1000);
  };

  const onImageUpload = (e) => {
    const file = e.target.files[0];
    dispatch(setForm("image", file));
    dispatch(setImgPreview(URL.createObjectURL(file)));
  };

  return (
    <div className="blog-post">
      <Link title="kembali" onClick={() => history.push("/")} />
      <p className="title">{isUpdate ? "Update" : "Create new"} Blog Page</p>
      <Input
        label="Post Title"
        value={title}
        onChange={(e) => dispatch(setForm("title", e.target.value))}
      />
      <Upload onChange={(e) => onImageUpload(e)} img={imgPreview} />
      <TextArea
        value={body}
        onChange={(e) => dispatch(setForm("body", e.target.value))}
      />
      <Gap height={20} />
      <div className="button-action">
        <Button
          title={isUpdate ? "update" : "submit"}
          onClick={onSubmit}
          Loading={loading}
        />
      </div>
      <Gap height={20} />
    </div>
  );
};

export default withRouter(CreateBlog);
