import React from 'react';
import DiceLauncherMini from './diceLauncherMini';
import styles from '../style/kitUI.module.css';
import '../diceLauncher/diceLauncherPage.css';
import DlBackground from '../images/Pop-up 1.png';
import Navbar from '../navbar/navbar' 



function DiceLauncherPage() {
    return (
        <div id='fullContainer' className={styles.homeBackground}>
            <header>
                <Navbar />
                <h1 className={styles.cornerLeftTitle}>
                <a href="./">Harmonistère</a>
                </h1>
            </header>
            <div id='dlBackground' className={styles.diceLauncherBackground}>
                <h2 id='dlTitle' className={styles.blueHarmonistereTitle}>Lanceur de dés</h2>
                <DiceLauncherMini />
            </div>
        </div>
    );
}

export default DiceLauncherPage;
