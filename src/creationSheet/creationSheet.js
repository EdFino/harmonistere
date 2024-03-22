import React, { useState } from 'react';
import Navbar from '../navbar/navbar';
import './creationSheet.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import SelectPersonnality from '../selectPersonnality';
import SelectTest from './selectTest';
import SelectCharacteristic from './selectCharacteristic';
import FourthChapterSheet from './fourthChapterSheet';

function CreationSheet () {

  const [isBender, setIsBender] = useState(false);
  const [selectionBender, setSelectionBender] = useState('');
  const [uploadAvatar, setUploadAvatar] = useState (null);

  const benderOrNotBender = () => {
    setIsBender(!isBender);
    console.log (isBender);
    const bendingList = document.getElementById('disappearBending');
    if (isBender) {
      bendingList.classList.add('disappear');
    } else {
      bendingList.classList.remove('disappear');
    }
  }


  const selectingBender = (event) => {
    setSelectionBender(event.target.value);
    console.log (selectionBender);
  }

  function handleAvatarChange (e) {
    const avatar = e.target.files[0];
    setUploadAvatar(avatar);
  }

  return (
    <>
    <Navbar/>
    <h1>Création de votre nouvelle fiche</h1>

    <form id="sheetForm">

      <div id="firstChapter" className="chapter">
        <div id='firstChapterForm'>

        <h2>1/ Identité de votre personnage</h2>

        <label htmlFor='characterAvatar'>Votre avatar : </label>
        <input type='file' id='characterName' name='characterName' onChange={handleAvatarChange}/><br/>
        {uploadAvatar && (<><img src={URL.createObjectURL(uploadAvatar)} alt="Uploaded" width="200" /><br/></>)}

        <label htmlFor='characterName'>Le nom de votre personnage : </label>
        <input type='text' id='characterName' name='characterName' required /><br/>

        <label htmlFor='characterAge'>L'âge de votre personnage : </label>
        <input type='int' id='characterAge' name='characterAge' required /><br/>

        <label htmlFor='benderOrNot'>Votre personnage maîtrise-t-il un élément ? </label>
        <input type='checkbox' checked={isBender} onChange={benderOrNotBender} id='benderOrNot' name='benderOrNot' /><br/>

        <div id="disappearBending" className="disappear">
        <label htmlFor='benderSelect'>Choisissez votre élément : </label>
        <select id="benderSelect" value={selectionBender} onChange={selectingBender}>
          <option value="earth">Terre</option>
          <option value="fire">Feu</option>
          <option value="air">Air</option>
          <option value="water">Eau</option>
        </select>
        </div><br/> 
        </div>
        
        <div className="sideTextForm">
          <p>Voici la partie la plus simple ! Posez simplement les informations de votre personnage, vous ne devriez avoir aucun souci.</p>
        </div>

        <Popup trigger=
        {
        <div id='firstHelp' className='helpPopup'>
          ?
        </div>}
        position="left center">
          <p>Vous ne devriez pas avoir trop de soucis pour cette partie. Sachez cependant que si vous décidez de ne pas joueur
            un harmonistère, vous ne serez pas pénalisés au niveau des règles, elles ont été écrites avec l'idée que tout le monde
            soit sur un pied d'égalité, même les personnages qui ne sont pas doués pour l'action.
          </p>
        </Popup>

      </div>

      <div id="secondChapter" className="chapter">
        <div id='secondChapterForm'>
          <SelectTest/>
        </div>
        <div className="sideTextForm">
          <p>Choisissez ici la personnalité de votre personnage. Vous aurez quatre champs d'importance décroissante
            (Principal, Ascendant, Neutre, Trait contraire) sur lequel vous pourrez poser une fois chaque élément.</p>
          </div>
        <Popup trigger=
        {
        <div id='secondHelp' className='helpPopup'>
          ?
        </div>}
        position="left center">
          <p>
            Principal : Le trait le plus important de votre personnage, l'élément qui le caractérise le plus, l'état émotionnel dans lequel il se sent le plus à l'aise.<br/>
            Ascendant : Le trait secondaire qui le définit selon une relative importance.<br/>
            Neutre : Correspond à l'élément avec lequel il n'a pas énormément d'affinités. Votre personnage n'est pas connu pour réagir ainsi.<br/>
            Trait opposé : Votre personnage est tout sauf cet élément. C'est plutôt inhabituel de le voir ainsi. Comprenez que l'élément que vous poserez n'est pas obligatoirement l'inverse de celui que vous aurez mis en principal.<br/>
            Terre : L'élément de la résilience, du rationnalisme, du concret, de la force tranquille, du calme, de l'ordre.
            Feu : L'élément de la passion, de la force, du courage, de la vitalité, de l'intimidation, du défi.
            Air : L'élément de la spiritualité, de l'introspection, de l'adaptation, du voyage, de la curiosité.
            Eau : L'élément du lien, de l'empathie, de la diplomatie, du changement, de la vie, de l'amour.

          </p>
        </Popup>
        </div>

        <div id="thirdChapter" className="chapter">
          <div id='thirdChapterForm'>
            <h2>3/ Caractéristiques</h2>
            <SelectCharacteristic/>
          </div>
        <div className="sideTextForm">
          <p>
            Vous pouvez maintenant déterminer les qualités et défauts de votre personnage à travers ces six caractéristiques.
            Vous commencez par défaut en neutre partout, et si vous cherchez à poser un bonus quelque part, il faudra contrebalancer par un défaut.
            Quant à un bonus critique, il faudra deux défauts pour se le procurer.
          </p>
          </div>
        <Popup trigger=
        {
        <div id='thirdHelp' className='helpPopup'>
          ?
        </div>}
        position="left center">
          <p>
          Les caractéristiques sont exprès décrites vagues. Vous pouvez ainsi vous les approprier et décider comment interpréter un bonus ou un malus à votre personnage.<br/>
          Corps : A rapport à vos capacités physiques : votre force brute, votre endurance, votre agilité, voire même une haute taille ou un beau visage, sont comptés dedans.<br/>
          Esprit : Vous pouvez compter dans esprit tout ce qui touche de près ou de loin à l'intellect : les capacités de déduction et de raisonnement, la mémoire, l'intelligence vive, la ruse ou les connaissances.<br/>
          Âme : L'âme comporte des qualités qu'on lie à la volonté, le sang-froid ou l'aura que dégage votre personnage.<br/>
          Arts martiaux : Cette caractéristique fait évidemment référence à votre qualité au corps-à-corps ; à vous de décider ensuite ce qui fait de votre personnage un guerrier redoutable.<br/>
          Arts élémentaires : Un harmonistère digne de ce nom investira soigneusement dans cette caractéristique qui détermine son aptitude à maîtriser son élément.<br/>
          Arts oratoires : Concerne l'éloquence de votre personnage, sa capacité à parler, être écouté, et cru.

          </p>
        </Popup>
        </div>
        
        <div id="fourthChapter" className="chapter">
          <div id='fourthChapterForm'>
            <h2>Votre personnage plus en détails</h2>
            <div className="sideTextForm">
              <p>Vous n'êtes pas obligés de remplir ces champs pour la validation de la fiche.
                Mais si vous trouvez l'inspiration plus tard et que vous possédez un compte, vous pourrez toujours les modifier dans votre espace jeu.
              </p>
            </div> 
            <FourthChapterSheet/>
           </div>
        </div>
    </form>
    </>
  )
}

export default CreationSheet