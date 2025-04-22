import Popup from 'reactjs-popup';
import validationModalIcon from '../images/validation-modal.png';
import style from '../style/modules/components/modal.module.css';
import styleB from '../style/modules/global/button.module.css';
import './customModal.css';

export default function CustomModal({ isOpen, onClose, message, messageEnd }) {
  return (
    <Popup open={isOpen} onClose={onClose} modal nested>
        <div className={style.modal}>
            <img src={validationModalIcon} alt='Icône de validation de modale'/>
            <div className={style.modalContent}>
                <p>{message}</p>
            </div>
            <div className={style.modalFooter}>
                <button className={styleB.buttonHarmonistere} onClick={onClose}>{messageEnd}</button>
            </div>
        </div>
    </Popup>
  );
}
