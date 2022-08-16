import React from 'react';

const ModalComponent = ({modal, modalCloseFn}) => {

  const onClickClose=()=>{
    modalCloseFn(); //부모 컴퍼넌트의 닫기 함수 호출 실행
  }

  return (
    modal.isShow && (
      <div id="modal">
        <div className="container">
          <ul>
            <li>
                <h2>알림메시지</h2>
                <button onClick={onClickClose} className="close-btn modal-close"><img src="./images/icon-close-button.webp" alt="close" /></button>
            </li>
            <li>
                <p className="modal-message">{modal.title}</p>
            </li>
          </ul>
          <div className='button-box'>
              <button onClick={onClickClose} className="ok-btn modal-close">확인</button>
          </div>
        </div> 
      </div>
    )
  );
};

export default ModalComponent;