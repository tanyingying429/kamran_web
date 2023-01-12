import React, { useState, useEffect, useMemo } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import moment from 'moment'

function Statistics() {
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)
  const [showCount, setShowCount] = useState(5)
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState(null);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    setLoading(false)
    api.listCustomers(offset, limit, 'created_at',
      (err, ret) => {
        setLoading(true)
        if (!err) {
          setContacts(ret)
        } 
      }
    );
  }, []);

  const showMore = ()=>{
    setShowCount(showCount + 10)
  }

  return (
    <>
      <main className="contact-area">
        <div className="contact-form-header">
          {contacts.length==0&&<div className="w-100 text-center">There is no contact.</div>}
          {contacts.slice(0, showCount).map((contact, index)=><div className="responsive-row" key={index} style={{borderBottom: '0.5px solid #666'}}>
            <div className="responsive-col flex-1">
              <div className="responsive-col-header">Provider</div>
              <div className="body-md">{contact.provider}</div>
            </div>
            <div className="responsive-col flex-1">
              <div className="responsive-col-header">From Name</div>
              <div className="heading-xxxs">
                <a href={`mailto:${contact.from_email}`} style={{color: '#ddd', fontSize: 16}}>{contact.from_name}</a>
              </div>
            </div>
            <div className="responsive-col-full flex-2">
              <div className="responsive-col-header">From Email</div>
              <div className="heading-xxxs">
                <a href={`mailto:${contact.from_email}`} style={{color: '#ddd', fontSize: 16}}>{contact.from_email}</a>
              </div>
            </div>
            <div className="responsive-col flex-1">
              <div className="responsive-col-header">To Name</div>
              <div className="heading-xxxs">{contact.to_name}</div>
            </div>
            <div className="responsive-col-full flex-2">
              <div className="responsive-col-header">To Email</div>
              <div className="heading-xxxs">
                {contact.to_email}
              </div>
            </div>
            <div className="responsive-col flex-1">
              <div className="responsive-col-header">Date</div>
              <div className="body-md">{contact.created_at?moment(contact.created_at).format('MM/DD/YYYY'):'-'}</div>
            </div>
            <div className="responsive-col flex-1">
              <div className="responsive-col-header">Subject</div>
              <div className="body-md">{contact.subject}</div>
            </div>
            <div className="responsive-col-full flex-2">
              <div className="responsive-col-header">Body</div>
              <div className="body-md clamp">{contact.body}</div>
            </div>
            <div className="responsive-col flex-1">
              <div className="responsive-col-header">Status</div>
              <div className="body-md" style={{color: contact.is_success?"yellow":"red"}}>{contact.is_success?"Success":"Fail"}</div>
            </div>
          </div>)}
        </div>
        {contacts.length > showCount && <div className="contact-form-bottom">
          <div className="form-btn-area">
            <button className="form-sbmt footer-btn" onClick={showMore}>
              Show more ({contacts.length - showCount})
            </button>
          </div>
        </div>}
      </main>
    </>
  );
}

export default Statistics;
