import React, { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import api from "../api";
import InputBox from '../components/InputBox';
import TextArea from '../components/TextArea';
import CheckBox from '../components/CheckBox';
import Button from '../components/Button';
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
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

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
              <InputBox placeholder="From Name" label="From Name *" type="text" value={fromName} onChange={setFromName} className="mt-2" error={errorFromName}/>
              <InputBox placeholder="From Email" label="From Email *" type="email" value={fromEmail} onChange={setFromEmail} className="mt-2" error={errorFromEmail}/>
              <InputBox placeholder="To Name" label="To Name *" type="text" value={toName} onChange={setToName} className="mt-2" error={errorToName}/>
              <InputBox placeholder="To Email" label="To Email *" type="email" value={toEmail} onChange={setToEmail} className="mt-2" error={errorToEmail}/>
              <InputBox placeholder="Subject" label="Subject *" type="text" value={subject} onChange={setSubject} className="mt-2" error={errorSubject}/>
              <TextArea placeholder="Body" label="Body *" value={body} onChange={setBody} className="mt-2" error={errorBody}/>
              <div className="provider-row mt-2">
                <CheckBox label="Provider 1" type="text" isChecked={isProvider1} onClick={onSetProvider1}/>
                <CheckBox label="Provider 2" type="text" isChecked={isProvider2} onClick={onSetProvider2}/>
              </div>
              <Button label="Submit" onClick={handleSubmit}/>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Contact;
