import React from 'react';

export default function MessageError(props) {
  return (
    <>
      <div className={`message ${props.className}`} >
        <span>{props.title}</span>
      </div>
    </>
  );
}