import "./Footer.css";
import Logo2White from "../Assets/logos/logo2white.png";
import FBWhite from "../Assets/contactimg/icons/fbwhite.png";
import { useNavigate } from "react-router-dom"; 

const Footer = () => {
    const navigationItems = [
        { name: "Home", path: "/" },
        { name: "About", path: "/aboutus" },
        { name: "Book Now", path: "/booking" },
        { name: "Services", path: "/services" },
        { name: "Contacts", path: "/contact" }
    ];

    const navigate = useNavigate();

    const handleNavClick = (item) => {
        navigate(item.path);
    };

    const handleSocialClick = (platform) => {
        if (platform === "Facebook") {
            window.open("https://www.facebook.com/people/Dlorah-Dental-Orthodontic-Clinic/100065382493162/", "_blank");
        }
    };

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    {/* Left side - Logo and clinic info */}
                    <div className="footer-left">
                        <div className="footer-logo-section">
                            <div className="footer-logo-section">
                                <div className="footer-logo-stack">
                                    <div className="footer-logo-row">
                                        <img className="footer-tooth-icon" src={Logo2White} />
                                        <span className="footer-clinic-name">DS Clinic</span>
                                    </div>
                                    <span className="footer-doctor-name">by Dr. Dlorah Shaneen C. Quiño</span>
                                </div>
                            </div>
                        </div>

                        {/* Social media icon */}
                        <div className="footer-social">
                            <button
                                className="footer-social-btn"
                                onClick={() => handleSocialClick("Facebook")}
                                aria-label="Visit our Facebook page">
                                <img
                                    className="footer-facebook-icon"
                                    src={FBWhite}
                                    alt="Facebook" />
                            </button>
                        </div>
                    </div>

                    {/* Right side - Navigation */}
                    <div className="footer-right">
                        <nav className="footer-nav">
                            <ul className="footer-nav-list">
                                {navigationItems.map((item, index) => (
                                    <li key={index} className="footer-nav-item">
                                        <button
                                            className="footer-nav-link"
                                            onClick={() => handleNavClick(item)}
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;