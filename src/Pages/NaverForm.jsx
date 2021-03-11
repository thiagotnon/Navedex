import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Input from '../Components/Forms/Input';
import Message from '../Components/Modal/Message';
import Page from '../Components/Template/Page';
import api from '../Services/Api';
import validator from '../Validators/addNaverValidator';
import arrowLeftIMG from '../assets/img/arrow-left.svg';
import { utcFormat } from '../Helpers/functions';
import actionsMessage from '../Helpers/messages';

export default function NaverForm(props) {
  const [modal, setModal] = React.useState('');
  const [message, setMessage] = React.useState({});
  const [naverData, setNaverData] = React.useState({});

  const { register, handleSubmit, errors, setValue } = useForm();
  const reference = { register, validator, errors, setValue };

  React.useEffect(() => {
    const id = props.match.params.id;
    if (id) {
      api.get(`navers/${id}`).then(response => setNaverData(response.data));
    }
  }, [props]);

  function onSubmit(data) {

    const results = naverData.id ? api.put(`navers/${naverData.id}`, data) : api.post('navers', data);
    results.then(response => {
      setModal('active')
      if (naverData.id) {
        setMessage(actionsMessage.updateNaverConfirm);
      } else {
        setMessage(actionsMessage.createNaverConfirm);
      }
    }).catch(error => {
      setModal('active');
      setMessage(actionsMessage.createNaverError);
    })
  }

  function CloseNaverDetail() {
    setMessage('');
    props.history.push("/");
  }

  return (
    <>
      <Page>
        <div className="box-form">
          <header className="box-form-header">
            <Link className="btn-with-icons" to="/">
              <img src={arrowLeftIMG} alt="Back" />
            </Link>
            <h2>{naverData.id ? 'Editar' : 'Adicionar'} Naver</h2>
          </header>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="box-form-content">
              <Input label="Nome" type="text" name="name" id="name" placeholder="Nome" reference={reference} val={naverData.name} />
              <Input label="Cargo" type="text" name="job_role" id="job_role" placeholder="Cargo" reference={reference} val={naverData.job_role} />
              <Input label="Data de nascimento" type="text" name="birthdate" id="birthdate" placeholder="Data de nascimento" reference={reference} val={naverData.birthdate ? utcFormat(naverData.birthdate) : ''} mask="99/99/9999" />
              <Input label="Data de admissão" type="text" name="admission_date" id="admission_date" placeholder="Data de admissão" reference={reference} val={naverData.admission_date ? utcFormat(naverData.admission_date) : ''} mask="99/99/9999" />
              <Input label="Projetos que participou" type="text" name="project" id="project" placeholder="Projetos que participou" reference={reference} val={naverData.project} />
              <Input label="URL da foto do Naver" type="text" name="url" id="url" placeholder="URL da foto do Naver" reference={reference} val={naverData.url} />
            </div>
            <button className="btn btn-nave" type="submit">Salvar</button>
          </form>
        </div>
      </Page>

      {modal &&
        <Message
          className={modal}
          title={message.title}
          message={message.message}
          close={CloseNaverDetail}
        />
      }

    </>
  );
}