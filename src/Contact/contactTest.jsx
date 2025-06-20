import styles from "./Contact.module.css";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useRef, useState } from "react";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
    'https://your-project.supabase.co', // Replace with your Supabase URL
    'your-anon-key' // Replace with your Supabase anon key
);

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

const Contact = () => {
    const [heroRef, isHeroVisible] = useScrollAnimation();
    const [mapsRef, isMapsVisible] = useScrollAnimation();
    const [contactRef, isContactVisible] = useScrollAnimation();
    
    // Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Validate form data
            if (!formData.name || !formData.email || !formData.message) {
                alert('Please fill in all fields.');
                setIsSubmitting(false);
                return;
            }

            // Submit to Supabase
            const { data, error } = await supabase
                .from('inquiry_entries')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        message: formData.message,
                        created_at: new Date().toISOString()
                    }
                ]);

            if (error) {
                console.error('Error submitting form:', error);
                alert('There was an error submitting your form. Please try again later.');
            } else {
                console.log('Form submitted successfully:', data);
                alert('Thank you for your submission! We will get back to you soon.');
                
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    message: ''
                });
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            alert('There was an unexpected error. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <Navbar />
            <div 
                className={`${styles.hero} ${isHeroVisible ? styles.animate : ''}`}
                ref={heroRef}
            >
                <img className={styles.seatwide} src="seatwide.jpg" />
                <div className={styles.heading}>Contact Us </div>
                <div className={styles.subheading}>
                    Reach out to our various platforms to <br />
                    inquire or book an appointment!
                </div>
            </div>

            <div className={styles.section1}>
                <div 
                    className={`${styles.maps} ${isMapsVisible ? styles.animate : ''}`}
                    ref={mapsRef}
                >
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
                            <img className={styles.logo2white} src="/logos/logo2white.png" />
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
                <div 
                    className={`${styles["contact-body"]} ${isContactVisible ? styles.animate : ''}`}
                    ref={contactRef}
                >
                    <div className={styles["reach-out"]}>Reach out! </div>
                    <div className={styles["contact-row"]}>
                        <img className={styles.phone} src="/icons/phone.png" />
                        <div className={styles["phone-caption"]}>
                            Phone:
                            <br />
                            0950-278-3202
                        </div>
                    </div>
                    <div className={styles["contact-row"]}>
                        <img className={styles.whatsapp} src="/icons/whatsapp.png" />
                        <div className={styles["whatsapp-caption"]}>
                            WhatsApp:
                            <br />
                            0967-318-2461
                        </div>
                    </div>
                    <div className={styles["contact-row"]}>
                        <img className={styles.viber} src="/icons/viber.png" />
                        <div className={styles["viber-caption"]}>
                            Viber:
                            <br />
                            0967-318-2461
                        </div>
                    </div>
                    <div className={styles["contact-row"]}>
                        <img className={styles.facebook} src="/icons/fbblack.png" />
                        <div className={styles["facebook-caption"]}>
                            Facebook:
                            <br />
                            Dlorah Dental Orthodontic Clinic
                        </div>
                    </div>
                </div>
                <div className={styles["inquiry-container"]}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles["inquiry-form"]}>Inquiry Form </div>
                        <div className={styles.name}>Name </div>
                        <input 
                            className={styles.tf} 
                            type="text" 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your name"
                            required
                        />
                        <div className={styles.email}>Email </div>
                        <input 
                            className={styles.tf} 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            required
                        />
                        <div className={styles.message}>Message </div>
                        <textarea 
                            className={styles.ta} 
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Enter your message"
                            required
                        ></textarea>
                        <Button 
                            className={styles["submit-btn"]}
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </Button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;