import React, { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import api from "../api";
import checked from "../assets/images/checked.svg";
import unchecked from "../assets/images/unchecked.svg";
import { useNavigate } from "react-router-dom";
import openCloseNav from "../helper/openclosenav";

function Contact() {
  const navigate = useNavigate();
  const [fromName, setFromName] = useState(null);
  const [fromEmail, setFromEmail] = useState(null);
  const [toName, setToName] = useState(null);
  const [toEmail, setToEmail] = useState(null);
  const [subject, setSubject] = useState(null);
  const [body, setBody] = useState(null);
  const [isProvider1, setProvider1] = useState(false);
  const [isProvider2, setProvider2] = useState(false);

  const [errorFromName, setErrorFromName] = useState(null);
  const [errorFromEmail, setErrorFromEmail] = useState(null);
  const [errorToName, setErrorToName] = useState(null);
  const [errorToEmail, setErrorToEmail] = useState(null);
  const [errorSubject, setErrorSubject] = useState(null);
  const [errorBody, setErrorBody] = useState(null);

  useEffect(() => {
    scrollToTop();
    openCloseNavbar();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!fromName) {
      setErrorFromName("Please enter from name.");
      return;
    } else {
      setErrorFromName(null);
    }

    if (!fromEmail) {
      setErrorFromEmail("Please enter from email address.");
      return;
    } else {
      setErrorFromEmail(null);
    }
    
    if (!toName) {
      setErrorToName("Please enter to name.");
      return;
    } else {
      setErrorToName(null);
    }

    if (!toEmail) {
      setErrorToEmail("Please enter to email address.");
      return;
    } else {
      setErrorToEmail(null);
    }
    
    if (!subject) {
      setErrorSubject("Please enter subject.");
      return;
    } else {
      setErrorSubject(null);
    }

    if (!body) {
      setErrorBody("Please fill body.");
      return;
    } else {
      setErrorBody(null);
    }

    api.contactUs(
      {
        from_name: fromName,
        from_email: fromEmail,
        to_name: toName,
        to_email: toEmail,
        subject: subject,
        body: body,
        provider: isProvider1?"provider1":"provider2"
      },
      (err, ret) => {
        if (!err&&ret?.result) {
          navigate("/thanks");
        } else {
          api.contactUs(
            {
              from_name: fromName,
              from_email: fromEmail,
              to_name: toName,
              to_email: toEmail,
              subject: subject,
              body: body,
              provider: isProvider1?"provider2":"provider1"
            },
            (err, ret) => {
              if (!err&&ret?.result) {
                navigate("/thanks");
              } else {
                toast.error("Your email hasn’t been sent!");
              }
            }
          );
        }
      }
    );
  };

  const onSetProvider1 = () => {
    let tmpChecked = isProvider1;
    setProvider1(!tmpChecked);
    setProvider2(tmpChecked);
  };

  const onSetProvider2 = () => {
    let tmpChecked = isProvider2;
    setProvider2(!tmpChecked);
    setProvider1(tmpChecked);
  };

  const scrollToTop = () => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } catch (error) {
      window.scrollTo(0, 0);
    }
  };

  const openCloseNavbar = () => {
    const navMob = document.querySelector(".navbar-mob");
    if (navMob.style.display === "block") {
      openCloseNav();
    }
  };

  return (
    <>
      <main className="contact-area">
        <div className="contact-container">
          <div className="contact-form-area">
            <div className="contact-form">
              <form onSubmit={handleSubmit}>
                <div className="form-item">
                  <h4>From Name *</h4>
                  <input
                    type="text"
                    name="fromName"
                    className="form-input"
                    defaultValue={fromName}
                    onKeyUp={(e) => {
                      setFromName(e.target.value);
                    }}
                  />
                  {errorFromName?.length > 0 && (
                    <span className="error">{errorFromName}</span>
                  )}
                </div>
                <div className="form-item">
                  <h4>From Email *</h4>
                  <input
                    type="email"
                    name="fromEmail"
                    className="form-input"
                    defaultValue={fromEmail}
                    onKeyUp={(e) => {
                      setFromEmail(e.target.value);
                    }}
                  />
                  {errorFromEmail?.length > 0 && (
                    <span className="error">{errorFromEmail}</span>
                  )}
                </div>
                <div className="form-item">
                  <h4>To Name *</h4>
                  <input
                    type="text"
                    name="toName"
                    className="form-input"
                    defaultValue={toName}
                    onKeyUp={(e) => {
                      setToName(e.target.value);
                    }}
                  />
                  {errorToName?.length > 0 && (
                    <span className="error">{errorToName}</span>
                  )}
                </div>
                <div className="form-item">
                  <h4>To Email *</h4>
                  <input
                    type="email"
                    name="toEmail"
                    className="form-input"
                    defaultValue={toEmail}
                    onKeyUp={(e) => {
                      setToEmail(e.target.value);
                    }}
                  />
                  {errorToEmail?.length > 0 && (
                    <span className="error">{errorToEmail}</span>
                  )}
                </div>
                <div className="form-item">
                  <h4>Subject *</h4>
                  <input
                    type="text"
                    name="subject"
                    className="form-input"
                    defaultValue={subject}
                    onKeyUp={(e) => {
                      setSubject(e.target.value);
                    }}
                  />
                  {errorSubject?.length > 0 && (
                    <span className="error">{errorSubject}</span>
                  )}
                </div>
                <div className="form-item">
                  <h4>Body</h4>
                  <textarea
                    className="form-input-ta"
                    onChange={(e) => setBody(e.target.value)}
                  >
                    {body}
                  </textarea>
                  {errorBody?.length > 0 && (
                    <span className="error">{errorBody}</span>
                  )}
                </div>
                <div className="form-item w-check">
                  <img
                    className="checkbox-image"
                    src={isProvider1 ? checked : unchecked}
                    alt="checkbox"
                    onClick={() => onSetProvider1()}
                  />
                  <p>
                     Provider 1
                  </p>
                  <img
                    className="checkbox-image"
                    src={isProvider2 ? checked : unchecked}
                    alt="checkbox"
                    onClick={() => onSetProvider2()}
                  />
                  <p>
                     Provider 2
                  </p>
                </div>
                <div className="form-btn-area">
                  <button
                    className="form-sbmt footer-btn"
                    type="submit"
                    disabled={!isProvider1&&!isProvider2}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Contact;
