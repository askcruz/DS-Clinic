import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './AboutUs.module.css';
import '../components/Footer.css';
import '../components/Navbar.css';

import hmo1 from '../Assets/inlife.svg';
import hmo2 from '../Assets/valuecare.svg'; 
import hmo3 from '../Assets/etiqua.svg';
import hmo4 from '../Assets/cocolife.svg';
import hmo5 from '../Assets/icare.svg';

function AboutUs() {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
    }, []);

    return (
        <div className={styles['about-us-container']}>
            <div className={`${styles['about-hero-section']} ${animate ? styles.animate : ''}`}>
                <h1>About Us</h1>
                <p>Comfortable care, confident smiles.</p>
            </div>
            <Navbar />
            <div className={`${styles['vision-section']} ${animate ? styles.animate : ''}`}>
                <img src="/doc-better.jpg" alt="doctor" className={styles['dentist-image-svg']} />
                <div className={styles['vision-text']}>
                    <h2>Our Vision</h2>
                    <p>To be a leading dental clinic recognized for excellence in patient care, 
                    where every individual feels valued, comfortable, and confident in their smile.</p>
                </div>
            </div>

            <div className={`${styles['mission-section']} ${animate ? styles.animate : ''}`}>
                <img src="/dentist.jpg  " alt="patient" className={styles['patient-image-svg']} />
                <div className={styles['mission-text']}>
                    <h2>Our Mission</h2>
                    <p>To deliver high-quality and compassionate dental care in a comfortable environment,
                    promoting lifelong oral health and patient confidence.</p>
                </div>
            </div>
        
            <div className={`${styles['about-hmo-section']} ${animate ? styles.animate : ''}`}>
                <img src={hmo1} alt="inlife" className={styles['hmo-image-svg1']} />
                <img src={hmo2} alt="valuecare" className={styles['hmo-image-svg2']} />
                <img src={hmo3} alt="etiqua" className={styles['hmo-image-svg3']} />  
                <img src={hmo4} alt="cocolife" className={styles['hmo-image-svg4']} />
                <img src={hmo5} alt="icare" className={styles['hmo-image-svg5']} />
                <h2>Health Maintenance Organization</h2>
            </div>

            <div className={styles['schedule-section']}>
                <h3>Operating Hours | Monday -Sunday | 10:00 Am to 6:00 Pm</h3>
                <h4>Open daily for your convenience.</h4>
            </div>
            <Footer />
        </div>
    );
}

export default AboutUs;
