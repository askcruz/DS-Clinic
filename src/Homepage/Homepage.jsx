import styles from "./Homepage.module.css";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const useScrollAnimation = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible];
};

const Homepage = () => {
  const navigate = useNavigate();
  const [aboutUsRef, isAboutUsVisible] = useScrollAnimation();
  const [servicesRef, isServicesVisible] = useScrollAnimation();
  const [contactsRef, isContactsVisible] = useScrollAnimation();

  return (
    <div className={styles.Homepage}>
      <Navbar />

      <div className={styles.hero}>
        <img className={styles.logo} src="/logos/Clinic.png" />
      </div>

      <div className={styles.section1}>
        <div
          className={`${styles["about-us-section"]} ${isAboutUsVisible ? styles.animate : ''}`}
          ref={aboutUsRef}
        >
          <div className={styles["frame-1"]}>
            <img className={styles.storefront} src="storefront.jpg" />
            <img className={styles.headshot} src="headshot.jpg" />
            <img className={styles.seatcloseup} src="seatcloseup.jpg" />
            <img className={styles.seatbehind3} src="seatbehind3.jpg" />
            <img className={styles.frontdesk} src="frontdesk.jpg" />
          </div>
          <div className={styles["frame-2"]}>
            <div className={styles.Heading}>
              You and your teeth are in the right hands
            </div>
            <div className={styles.Subheading}>
              With several years of practice, our team of professionals will
              accommodate your needs with utmost care. Your comfort and health
              comes first!
            </div>
            <Button onClick={() => navigate('/aboutus')}>Learn More</Button>
          </div>
        </div>
      </div>

      <div className={styles.section2}>
        <div
          className={`${styles["services-section"]} ${isServicesVisible ? styles.animate : ''}`}
          ref={servicesRef}
        >
          <div className={styles["frame-3"]}>
            <div className={styles.Heading}>
              Quality dental care in our hands
            </div>
            <div className={styles.Subheading}>
              We offer excellent general dentistry and orthodontic services to our
              patients with various affiliations with health maintenance
              organizations for your convenience.
            </div>
            <Button onClick={() => navigate("/services")}>Learn More</Button>
          </div>
          <img className={styles.smile} src="smile.jpg" />
        </div>
      </div>

      <div className={styles.section3}>
        <div
          className={`${styles["contacts-appt"]} ${isContactsVisible ? styles.animate : ''}`}
          ref={contactsRef}
        >
          <div className={styles.Heading}>Connect with us! </div>
          <Button className={styles["contacts-btn"]} onClick={() => navigate("/contact")}>Reach out to us</Button>
          <Button className={styles["apts-btn"]} onClick={() => alert("Clicked!")}>Book an appointment</Button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Homepage;