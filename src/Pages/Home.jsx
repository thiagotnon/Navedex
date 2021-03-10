import React from 'react';
import Modal from '../Components/Modal/Modal';
import Message from '../Components/Modal/Message';
import CardNaver from '../Components/CardNaver';
import Page from '../Components/Template/Page';
import api from '../Services/Api';
import actionsMessage from '../Helpers/messages';

import defaultIMG from '../assets/img/default_thumbnail.svg';

export default function Home() {
  const [naver, setNaver] = React.useState({});
  const [navers, setNavers] = React.useState([]);
  const [message, setMessage] = React.useState({})
  const [detailmodal, setDetailModal] = React.useState('');
  const [naverToExclude, setNaverToExclude] = React.useState(null)
  const [confirmMmessage, setConfirmMessage] = React.useState('');
  const [afterExcludeMessage, setAfterExcludeMessage] = React.useState('');

  React.useEffect(() => {
    api.get('navers').then(response => {
      setNavers(response.data);
    });
  }, [])

  function NaverDetail(event) {
    setNaver('');
    const id = event.target.id;
    api.get(`navers/${id}`).then(response => {
      setNaver(response.data);
    });
    setDetailModal('active');
  }

  function CloseMessage() {
    setNaver('');
    setDetailModal('');
    setConfirmMessage('');
    setAfterExcludeMessage('');
  }

  function ExcludeNaver(event) {
    const id = event.target.id;
    setNaverToExclude(id);
    setMessage(actionsMessage.excludeQuestion);
    setConfirmMessage('active');
    return id;
  }

  function ExcludeConfirm() {
    setConfirmMessage('');
    api.delete(`navers/${naverToExclude}`).then(response => {
      setMessage(actionsMessage.excludeConfirm);
      api.get('navers').then(response => {
        if (response) {
          setNavers(response.data);
        }
      })
      setConfirmMessage('');
      setDetailModal('')
      setNaverToExclude('');
      setAfterExcludeMessage('active')
    })
  }

  const orderNavers = navers.sort((a, b) => a.name > b.name ? 1 : -1);
  return (
    <>
      <Page title="Navers" button_name="Adicionar Naver" link="add-naver">
        <div className="list-nave-cards">
          <>
            {navers.length === 0 ?
              <span className="message-not-found">
                Nenhum <strong>naver</strong> cadastrado.
              </span>
              : <>
                {orderNavers.map(naver => (
                  <CardNaver
                    key={naver.id}
                    id={naver.id}
                    image={naver.url ? naver.url : defaultIMG}
                    name={naver.name}
                    position={naver.job_role}
                    exclude={ExcludeNaver}
                    detail={NaverDetail}
                  />
                ))}
              </>
            }
          </>
        </div>
      </Page>

      {naver &&
        <Modal
          className={detailmodal}
          id={naver.id}
          name={naver.name}
          image={naver.url ? naver.url : defaultIMG}
          job_role={naver.job_role}
          birthdate={naver.birthdate}
          admission_date={naver.admission_date}
          project={naver.project}
          close={CloseMessage}
          exclude={ExcludeNaver}
        />
      }

      {confirmMmessage &&
        <Message
          className={confirmMmessage}
          title={message.title}
          message={message.message}
          close_message={CloseMessage}
          confirm={ExcludeConfirm}
        />
      }

      {afterExcludeMessage && <Message
        className={afterExcludeMessage}
        title={message.title}
        message={message.message}
        close={CloseMessage}
      />}
    </>
  );
}