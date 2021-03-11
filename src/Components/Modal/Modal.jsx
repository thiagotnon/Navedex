import React from 'react';
import { Link } from 'react-router-dom';
import DetailInfo from '../DetailInfo';
import closeIcon from '../../assets/img/close_icon.svg';
import deletIcon from '../../assets/img/delete_icon.svg';
import editIcon from '../../assets/img/edit_icon.svg';

export default function Modal(props) {
  const { className, modalRef } = props;

  return (
    <>
      <div ref={modalRef} className={`modal ${className ? className : ''}`}>
        <div className="modal-body nave-detail">
          <button className="close btn-whit-icons" onClick={props.close}>
            <img src={closeIcon} alt="Close" />
          </button>
          <div className="modal-content nave-content">
            <div className="naver-image">
              <img src={props.image} alt={props.name} />
            </div>
            <div className="naver-info">
              <div className="naver-description">
                <DetailInfo
                  name={props.name}
                  job_role={props.job_role}
                  birthdate={props.birthdate}
                  admission_date={props.admission_date}
                  project={props.project}
                />
              </div>
              <div className="naver-actions">
                <button className="btn-with-icon" onClick={props.exclude} >
                  <img src={deletIcon} alt="Exclude" id={props.id} />
                </button>
                <Link to={`edit-naver/${props.id}`} className="btn-with-icon">
                  <img src={editIcon} alt="Edit" />
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}