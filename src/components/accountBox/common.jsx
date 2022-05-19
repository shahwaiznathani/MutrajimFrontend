import styled from "styled-components";

export const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 2.5px rgba(15, 15, 15, 0.19);
  border: none;
`;

export const MutedLink = styled.a`
  font-size: 11px;
  color: #fff;
  font-weight: 500;
  text-decoration: none;
`;

export const BoldLink = styled.a`
  font-size: 11px;
  color: #D09072;
  font-weight: 500;
  text-decoration: none;
  margin: 0 4px;
`;

export const Input = styled.input`
  width: 100%;
  height: 42px;
  outline: none;
  border: none;
  padding: 0px 10px;
  transition: all 200ms ease-in-out;
  font-size: 12px;
  background-color: rgba( 255,255, 255, 0.1); /* transparent white */
  color:white;

  &::placeholder {
    color: rgba(200, 200, 200, 1);
  }

  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid #DC9573;
  }
`;

export const SubmitButton = styled.button`
  width: 60%;
  padding: 11px;

  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: rgb(241, 196, 15);
  background: linear-gradient(0deg, #DC9573, #DC9573), 
  linear-gradient(0deg, rgba(232, 174, 147, 0.2), 
  rgba(232, 174, 147, 0.2)), 
  #D09072;

  &:hover {
    filter: brightness(1.03);
  }
`;
