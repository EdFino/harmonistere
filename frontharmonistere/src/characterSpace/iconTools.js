import React from 'react';
import saveIcon from '../images/saveIcon.png';
import privateIcon from '../images/private.png';
import editeurIcon from '../images/editeur.png';
import imageKit from '../style/modules/global/image.module.css';

const IconTools = ({ onSaveClick }) => {
  return (
    <div id="iconCharacterSpace">
      <img
        src={saveIcon}
        className={imageKit.iconProperties}
        alt="Icône pour sauvegarder sa fiche"
        style={{ marginRight: '0.6em' }}
        onClick={onSaveClick}
      />
      <img
        src={privateIcon}
        className={imageKit.iconProperties}
        alt="Icône pour flouter des zones"
        style={{ marginRight: '0.6em' }}
      />
      <img
        src={editeurIcon}
        className={imageKit.iconProperties}
        alt="Icône pour éditer sa fiche de personnage"
      />
    </div>
  );
};

export default IconTools;