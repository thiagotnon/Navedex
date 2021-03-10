import React from 'react';
import { Link } from 'react-router-dom';
import deletIcon from '../assets/img/delete_icon.svg';
import editIcon from '../assets/img/edit_icon.svg';


export default function CardNaver(props) {
  return (
    <>
      <div className="card">
        <button className="btn-detail" onClick={props.detail} >
          <div className="card-header">
            <img src={props.image} alt={props.name} id={props.id} />
          </div>
          <div className="card-body">
            <h4>{props.name}</h4>
            <p>{props.position}</p>
          </div>
        </button>
        <div className="card-footer">
          <button className="btn-with-icon" onClick={props.exclude} >
            <img src={deletIcon} alt="Exclude" id={props.id} />
          </button>
          <Link to={`edit-naver/${props.id}`} className="btn-with-icon">
            <img src={editIcon} alt="Edit" id={props.id} />
          </Link>
        </div>
      </div>
    </>
  );
}