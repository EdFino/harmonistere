import Popup from 'reactjs-popup';
import validationModalIcon from '../images/validation-modal.png';
import style from '../style/modules/components/modal.module.css';
import styleB from '../style/modules/global/button.module.css';
import './customModal.css';

export default function CustomModal({ isOpen, onClose, message, messageEnd, secondOnClose, secondMessageEnd }) {
    
  return (
    <Popup open={isOpen} onClose={onClose} modal nested>
      <div className={style.modal}>
      {!secondOnClose || !secondMessageEnd ? (
        <img src={validationModalIcon} alt='Icône de validation de modale' />
          ) : null}
        <div className={style.modalContent}>
          <p>{message}</p>
        </div>
        <div className={style.modalFooter}>
        {secondOnClose && secondMessageEnd ? (
            <button className={styleB.buttonHarmonistere} onClick={secondOnClose}>
              {secondMessageEnd}
            </button>
          ) : null}
          <button className={styleB.buttonHarmonistere} onClick={onClose}>
            {messageEnd}
          </button>
        </div>
      </div>
    </Popup>
  );
}
