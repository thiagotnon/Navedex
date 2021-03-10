import React from 'react';
import { yearsFormat } from '../Helpers/functions';

export default function DetailInfo(props) {

  return (
    <>
      {props.name &&
        <div>
          <h2>{props.name}</h2>
          <p>{props.job_role}</p>
        </div>
      }
      {props.birthdate &&
        <div>
          <h4>Idade</h4>
          <p>{yearsFormat(props.birthdate)} anos de idade</p>
        </div>
      }
      {props.admission_date &&
        <div>
          <h4>Tempo de empresa</h4>
          <p>{yearsFormat(props.admission_date)} ano{yearsFormat(props.admission_date) < 2 ? '' : 's'} de empresa</p>
        </div>
      }
      {props.project &&
        <div>
          <h4>Projetos que participou</h4>
          <p>{props.project}</p>
        </div>
      }
    </>
  );
}