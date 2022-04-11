import React from "react";
import "./footer.scss";
import {
  ICFacebook,
  ICTwitter,
  ICInstagram,
  ICTelegram,
  ICDiscord,
  ICgithub,
} from "../../../assets";
import { useEffect } from "react";

const Icon = ({ img, link }) => {
  return (
    <a className="icon-wrapper" href={link}>
      <img className="icon-medsos" src={img} alt="icon" />
    </a>
  );
};

const Footer = () => {
  useEffect(() => {
    const logo = document.querySelector(".logo");
    const huruf = [...logo.textContent]
      .map((l) => `<span>${l}</span>`)
      .join("");
    logo.innerHTML = huruf;
  }, []);
  return (
    <div>
      <div className="footer">
        <div>
          <p className="logo">FarWeb</p>
        </div>
        <div className="social-wrapper">
          <Icon
            img={ICFacebook}
            link={"https://www.facebook.com/faragi.gandi"}
          />
          <Icon img={ICTwitter} link={"https://twitter.com/FaturRa30095136"} />
          <Icon
            img={ICInstagram}
            link={"https://www.instagram.com/fatur_r45/"}
          />
          <Icon img={ICTelegram} />
          <Icon img={ICDiscord} />
          <Icon img={ICgithub} />
        </div>
      </div>
      <div className="copyright">
        <p>Copyright</p>
      </div>
    </div>
  );
};

export default Footer;
