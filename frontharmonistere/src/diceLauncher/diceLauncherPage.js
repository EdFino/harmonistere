import React from 'react';
import DiceLauncherMini from './diceLauncherMini';
import styles from '../style/kitUI.module.css';
import '../diceLauncher/diceLauncherPage.css';
import DlBackground from '../images/Pop-up 1.png';



function DiceLauncherPage() {
    return (
        <div id='fullContainer' className={styles.homeBackground}>
            <h1 className={styles.cornerLeftTitle} >Harmonistère</h1>
            <div id='dlBackground' className={styles.diceLauncherBackground}>
                <h2 id='dlTitle' className={styles.blueHarmonistereTitle}>Lanceur de dés</h2>
                <DiceLauncherMini />
            </div>
        </div>
    );
}

export default DiceLauncherPage;
