import React from 'react';
import closeIcon from '../../assets/img/close_icon.svg';

export default function ModalMessage(props) {
  const { className, modalRef } = props;

  return (
    <>
      <div ref={modalRef} className={`modal ${className ? className : ''}`}>
        <div className="modal-body modal-message">
          {props.close &&
            <button className="close btn-whit-icons" onClick={props.close}>
              <img src={closeIcon} alt="Close" />
            </button>
          }
          <div className="modal-content">
            <h2>{props.title}</h2>
            <p>{props.message}</p>
          </div>
          {props.confirm &&
            <div className="modal-footer">
              <button className="btn btn-nave-outline" onClick={props.close_message}>Cancelar</button>
              <button className="btn btn-nave" onClick={props.confirm}>Excluir</button>
            </div>
          }
        </div>

      </div>
    </>
  );
}