import React, {useState} from 'react'
import styled from "styled-components";

const InputBox = (props) => {
  let { placeholder, error, label, value, className, type, onChange, ...rest } = props
  
  return (
    <Wrapper className={className}>
      <h4>{label}</h4>
      <input
        type={type||'text'}
        className="form-input"
        placeholder={placeholder}
        defaultValue={value}
        onChange={(e) => {
          if(onChange) onChange(e.target.value)
        }}
        {...rest}
      />
      {error?.length > 0 && (
        <span className="error">{error}</span>
      )}
    </Wrapper>
  )
}

export default InputBox;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  h4 {
    font-family: "ResistSansBold", sans-serif;
    color: white;
    text-transform: uppercase;
    font-size: 1.8rem;
    line-height: 20px;
    letter-spacing: -5%;
    margin-bottom: 1rem;
  }
  .form-input {
    width: 55%;
    border-radius: 100px;
    height: 4rem;
    padding: 0.5rem 1.5rem;
    color: black;
    font-size: 1.6rem;
    font-family: "Poppins";
  }
  form .form-item:not(:first-child) {
    margin-top: 3rem;
  }
  .form-input:focus-visible {
    outline: #eb4ee6 solid 3px;
  }
  .form-input-ta:focus-visible {
    outline: #eb4ee6 solid 3px;
  }
  .error {
    font-size: 12px;
    color: #f86969;
    margin-top: 2px;
    padding-left: 5px;
  }
`;
