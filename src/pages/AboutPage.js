import React, { Fragment, useEffect } from "react";
import Layout from "../containers/Layout";
import pdf from "../assets/images/Odinakachukwu Ezeobika Resume.pdf";

import "../assets/stylesheets/pages/about-page.scss";

import portrait from "../assets/images/portrait.jpg";
import facebook from "../assets/images/facebook.svg";
import github from "../assets/images/github.svg";
import instagram from "../assets/images/instagram.svg";
import linkedin from "../assets/images/linkedin.svg";
import twitter from "../assets/images/twitter.svg";

function AboutPage() {
  useEffect(() => {
    const page = window.location.href.split("/");
    const last = page.length - 1;
    if (page[last] === "about") {
      document.getElementById("footer").style.position = "fixed";
    }
  });

  const about = (
    <Fragment>
      <div className="row">
        <div className="col-md-3">
          <img
            src={portrait}
            className="rounded-circle"
            height="200"
            alt="Profile"
          />
        </div>
        <div className="col-md-9">
          <h1 className="font-weight-bold">Odinakachukwu Solomon Ezeobika</h1>
          <p className="about-dev">
            Hello! I am a{" "}
            <span className="font-weight-bold">software engineer</span> and{" "}
            <span className="font-weight-bold">graphic/UI designer</span> with{" "}
            <span className="font-weight-bold">3+</span> years professional
            experience. I started off my career freelancing as a graphic/UI
            designer and then evolved into web application developer.
          </p>
          <p className="about-dev">
            I am passionate about building solutions that improve business
            efficiency and provide better service to the public. I am driven by
            the desire to make people's lives easier; and I am loving it!
          </p>
          <h3 className="font-weight-bold">Hobbies</h3>
          <p className="about-dev">
            When I am not coding, I listen to music, sing or play my favorite
            musical instrument - the keyboard. I love to research, and travel so
            as to learn new things, gain new experiences, see new places, meet
            new people, try new foods, and make memories that will last a
            lifetime.
          </p>
          <h5>Connect with me:</h5>
          <p>
            <a
              href="https://facebook.com/ezeobika.o.solomon"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={facebook}
                className="rounded-circle mr-2"
                height="30"
                alt="Facebook"
              />
            </a>
            <a
              href="https://instagram.com/debig_solo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={instagram}
                className="rounded-circle mr-2"
                height="30"
                alt="Instagram"
              />
            </a>
            <a
              href="https://twitter.com/busy_dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={twitter}
                className="rounded-circle mr-2"
                height="30"
                alt="Twitter"
              />
            </a>
            <a
              href="https://linkedin.com/in/odinakachukwu-ezeobika-5892778a"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={linkedin}
                className="rounded-circle mr-2"
                height="30"
                alt="LinkedIn"
              />
            </a>
            <a
              href="https://github.com/ODINAKACHUKWU"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={github}
                className="rounded-circle"
                height="30"
                alt="Github"
              />
            </a>
          </p>
          <p>
            <a href={pdf} target="_blank" rel="noopener noreferrer">
              View my resume
            </a>
          </p>
        </div>
      </div>
    </Fragment>
  );

  return <Layout component={about} />;
}

export default AboutPage;
