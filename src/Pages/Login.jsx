import React from 'react';
import { withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Input from '../Components/Forms/Input';
import Message from '../Components/Modal/Message';
import Page from '../Components/Template/Page';
import validator from '../Validators/loginValidator';
import api from '../Services/Api';
import { login } from "../Services/Auth";
import logoIMG from '../assets/img/logo.svg';

function Login(props) {
  const [errorMessage, setErrorMessage] = React.useState('');
  const [showMessage, setShowMessage] = React.useState('');
  const { register, handleSubmit, errors } = useForm();
  const reference = { register, validator, errors };

  React.useState(() => {
    const data = localStorage.getItem('navers_token');
    if (data) {
      props.history.push("/");
    }
  }, []);

  function CloseMessage() {
    setShowMessage('')
  }

  function onSubmit(data) {
    api.post('users/login', data).then(response => {
      if (response.data.token) {
        login(response.data.token);
        props.history.push("/");
      }
    }).catch((error) => {
      setErrorMessage(error.response.data);
      setShowMessage('active')
      setTimeout(() => {
        setShowMessage('')
      }, 6000);
    });
  }

  return (
    <>
      <Page className="login-container">
        <div className="card-login">
          <div className="brand-login">
            <img src={logoIMG} alt="nave.rs" />
          </div>
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <Input label="E-mail" type="email" name="email" id="email" placeholder="E-mail" reference={reference} />
            <Input label="Senha" type="password" name="password" id="password" placeholder="Senha" reference={reference} />
            <button className="btn btn-nave" type="submit">Entrar</button>
          </form>
        </div>
      </Page>
      <Message className={showMessage} title={errorMessage.name} message={errorMessage.message} close={CloseMessage} />
    </>
  );
}

export default withRouter(Login);