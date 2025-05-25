import styles from "./Contact.module.css";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
    return (
        <div>
            <Navbar />
            <div className={styles.hero}>
                <img className={styles.seatwide} src="seatwide.jpg" />
                <div className={styles.heading}>Contact Us </div>
                <div className={styles.subheading}>
                    Reach out to our various platforms to <br />
                    inquire or book an appointment!
                </div>
            </div>

            <div className={styles.section1}>
                <div className={styles.maps}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3862.212733773944!2d121.0568567!3d14.5298208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9a485e00195%3A0xad1057249262fb95!2sDLORAH%20DENTAL%20AND%20ORTHODONTIC%20CLINIC!5e0!3m2!1sen!2sph!4v1747933906188!5m2!1sen!2sph"
                        width="747"
                        height="562"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <div className={styles["maps-text"]}>
                        <div className={styles.header}>
                            <img className={styles.logo2white} src="logo2white.png" />
                            <div className={styles.heading}>DS Clinic </div>
                            <div className={styles.subheading}>by Dr. Dlorah Shaneen C. Quiño </div>
                        </div>
                        <div className={styles.address}>
                            Address:
                            <br />
                            622 B Firefly St. Palar village, Brgy. Pinagsama Taguig City
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.section2}>
                <div className={styles["contact-body"]}>
                    <div className={styles["reach-out"]}>Reach out! </div>
                    <div className={styles["contact-row"]}>
                        <img className={styles.phone} src="phone.png" />
                        <div className={styles["phone-caption"]}>
                            Phone:
                            <br />
                            0950-278-3202
                        </div>
                    </div>
                    <div className={styles["contact-row"]}>
                        <img className={styles.whatsapp} src="whatsapp.png" />
                        <div className={styles["whatsapp-caption"]}>
                            WhatsApp:
                            <br />
                            0967-318-2461
                        </div>
                    </div>
                    <div className={styles["contact-row"]}>
                        <img className={styles.viber} src="viber.png" />
                        <div className={styles["viber-caption"]}>
                            Viber:
                            <br />
                            0967-318-2461
                        </div>
                    </div>
                    <div className={styles["contact-row"]}>
                        <img className={styles.facebook} src="fbblack.png" />
                        <div className={styles["facebook-caption"]}>
                            Facebook:
                            <br />
                            Dlorah Dental Orthodontic Clinic
                        </div>
                    </div>
                </div>
                <div className={styles["inquiry-container"]}>
                    <div className={styles["inquiry-form"]}>Inquiry Form </div>
                    <div className={styles.name}>Name </div>
                    <input className={styles.tf} type="text" placeholder="Enter your name" />
                    <div className={styles.email}>Email </div>
                    <input className={styles.tf} type="email" placeholder="Enter your email" />
                    <div className={styles.message}>Message </div>
                    <textarea className={styles.ta} placeholder="Enter your message"></textarea>
                    <Button className={styles["submit-btn"]}>Submit</Button>
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default Contact;