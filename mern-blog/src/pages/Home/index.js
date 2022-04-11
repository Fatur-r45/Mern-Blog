import { BlogItem, Button, Gap, Input } from "../../components";
import "./home.scss";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { setDataBlog } from "../../config/redux/action";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Axios from "axios";

const Home = (props) => {
  const [counter, setCounter] = useState(1);
  const [search, setSearch] = useState("");
  const { dataBlog, page } = useSelector((state) => state.homeReducer);
  const dispatch = useDispatch();

  // console.log("page: ", page);

  useEffect(() => {
    dispatch(setDataBlog(counter));
  }, [counter, dispatch]);

  const history = useHistory();

  const previous = () => {
    setCounter(counter <= 1 ? 1 : counter - 1);
    // console.log(counter);
  };

  const next = () => {
    setCounter(counter === page.totalPage ? page.totalPage : counter + 1);
    // console.log(counter);
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Lakukan Konfirmasi",
      message: "Apakah kamu yakin ingin menghapus.",
      buttons: [
        {
          label: "Iya",
          onClick: () => {
            Axios.delete(`http://localhost:4000/v1/blog/post/${id}`)
              .then((res) => {
                console.log("success: ", res.data);
                dispatch(setDataBlog(counter));
              })
              .catch((err) => {
                console.log("err: ", err);
              });
          },
        },
        {
          label: "Tidak",
          onClick: () => console.log("user tidak setuju"),
        },
      ],
    });
  };
  const handleInput = (e) => {
    setSearch(e.target.value);
  };
  // const onSubmit = () => {
  //   // console.log(nama);
  //   history.push(`/${nama}`);
  // };

  return (
    <div className="home-page-wrapper">
      <p className="nama">
        selamat datang <span className="name">{props.name}</span>
      </p>
      {/* <Button /> */}
      <div className="search-wrapper">
        <Input value={search} onChange={handleInput} placeholder="search" />
        <Button title="search" onClick={props.getUsers} />
      </div>
      <div className="create-wrapper">
        <Button
          title="create-blog"
          onClick={() => history.push("create-blog")}
        />
      </div>
      <Gap height={20} />
      <div className="content-wrapper">
        {dataBlog
          .filter((blog) => {
            if (search === "") {
              return blog;
            } else if (
              blog.title.toLowerCase().includes(search.toLowerCase())
            ) {
              return blog;
            }
            return false;
          })
          .map((blog) => {
            return (
              <BlogItem
                key={blog._id}
                image={`http://localhost:4000/${blog.image}`}
                title={blog.title}
                body={blog.body}
                name={blog.author.name}
                date={blog.createdAt}
                _id={blog._id}
                onDelete={confirmDelete}
              />
            );
          })}
      </div>
      <Gap height={10} />
      <div className="pagination">
        <Button title="previous" onClick={previous} />
        <Gap width={20} />
        <p className="text-page">
          {page.currentPage} / {page.totalPage}
        </p>
        <Gap width={20} />
        <Button title="next" onClick={next} />
      </div>
      <Gap height={20} />
    </div>
  );
};

export default Home;
