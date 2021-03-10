import React from 'react';
import { Link } from 'react-router-dom';

export default function Page(props) {
  return (
    <>
      <section className={`container ${props.className ? props.className : ''}`}>
        <div className="content">
          {props.title &&
            <header className="section-header">
              <h1>{props.title}</h1>
              <Link className="btn btn-nave" to={props.link}>{props.button_name}</Link>
            </header>
          }
          <div className="box-content">
            {props.children}
          </div>
        </div>
      </section>
    </>
  );
}