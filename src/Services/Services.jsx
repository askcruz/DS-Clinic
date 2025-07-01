import Card from '../components/Card';
import styles from './Services.module.css';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Footer from '../components/Footer';
import ServicesImg from '../Assets/servicesimg/services.png';
import ConsultationImg from '../Assets/servicesimg/consultation.png';
import OpImg from '../Assets/servicesimg/op.jpg';
import OpfImg from '../Assets/servicesimg/opf.jpg';
import DsImg from '../Assets/servicesimg/ds.jpg';
import PanoImg from '../Assets/servicesimg/pano.png';
import ComptfImg from '../Assets/servicesimg/comptf.jpg';
import OdImg from '../Assets/servicesimg/od.jpg';
import TfImg from '../Assets/servicesimg/tf.jpg';
import RctImg from '../Assets/servicesimg/rct.jpg';
import PeriaImg from '../Assets/servicesimg/peria.jpg';
import TwImg from '../Assets/servicesimg/tw.jpg';
import StfImg from '../Assets/servicesimg/stf.jpg';
import PfsImg from '../Assets/servicesimg/pfs.jpg';
import DiImg from '../Assets/servicesimg/di.jpg';
import CompteImg from '../Assets/servicesimg/compte.jpg';
import SteImg from '../Assets/servicesimg/ste.jpg';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        threshold: 0.2, 
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

const Services = () => {
  const [heroRef, isHeroVisible] = useScrollAnimation();
  const [bookRef, isBookVisible] = useScrollAnimation();
  const [gridRef, isGridVisible] = useScrollAnimation();

  const services = [
    {
      title: "Consultation",
      description: "meeting to seek advice, discuss concerns, or receive guidance on dental matters.",
      image: ConsultationImg,
      altText: "Consultation"
    },
    {
      title: "Oral Prophylaxis",
      description: "removes plaque, tartar, and stains from teeth to prevent oral diseases and maintain healthy gums.",
      image: OpImg,
      altText: "Oral Prophylaxis"
    },
    {
      title: "Oral Prophylaxis with Fluoride",
      description: "includes the application of fluoride to strengthen tooth enamel and prevent decay after the removal of plaque, tartar, and stains.",
      image: OpfImg,
      altText: "Oral Prophylaxis with Fluoride"
    },
    {
      title: "Deep Scaling",
      description: "cleans below the gum line to remove hardened plaque and tartar from tooth roots.",
      image: DsImg,
      altText: "Deep Scaling"
    },
    {
      title: "Panoramic Radiograph",
      description: "wide-view x-ray that captures the entire mouth in a single image, including all the teeth, upper and lower jaws, and surrounding structures.",
      image: PanoImg,
      altText: "Panoramic Radiograph"
    },
    {
      title: "Complicated Tooth Filling",
      description: "restoration of a larger or more intricate area of tooth decay, often requiring additional steps or materials to ensure proper structure and function.",
      image: ComptfImg,
      altText: "Complicated Tooth Filling"
    },
    {
      title: "Odontectomy",
      description: "surgical removal of a tooth, typically impacted or problematic teeth like wisdom teeth, from the jawbone and surrounding tissues.",
      image: OdImg,
      altText: "Odontectomy"
    },
    {
      title: "Temporary Filling",
      description: "short-term dental restoration used to protect a tooth after certain procedures or until a permanent filling can be placed.",
      image: TfImg,
      altText: "Temporary Filling"
    },
    {
      title: "Root Canal Treatment",
      description: "removing the infected or damaged pulp from the inside of a tooth, cleaning and shaping the canal, and then filling and sealing it to prevent further infection and save the tooth.",
      image: RctImg,
      altText: "Root Canal Treatment"
    },
    {
      title: "Periapical Radiograph",
      description: "dental x-ray that captures a detailed view of a single tooth and the surrounding bone from the crown to the root tip.",
      image: PeriaImg,
      altText: "Periapical Radiograph"
    },
    {
      title: "Teeth Whitening",
      description: "cosmetic dental procedure that lightens the shade of teeth by removing stains and discoloration from the enamel and dentin.",
      image: TwImg,
      altText: "Teeth Whitening"
    },
    {
      title: "Simple Tooth Filling",
      description: "cleaning and restoring a small area of tooth decay with a filling material to protect the tooth and prevent further damage.",
      image: StfImg,
      altText: "Simple Tooth Filling"
    },
    {
      title: "Pit & Fissure Sealant",
      description: "protective plastic coating applied to the chewing surfaces of back teeth to prevent cavities by sealing grooves and crevices where food and bacteria can accumulate.",
      image: PfsImg,
      altText: "Pit & Fissure Sealant"
    },
    {
      title: "Dental Implant",
      description: "a surgical component, typically made of titanium, that is placed into the jawbone to support a dental prosthesis such as a crown, bridge, or denture, effectively replacing a missing tooth root.",
      image: DiImg,
      altText: "Dental Implant"
    },
    {
      title: "Complicated Tooth Extraction",
      description: "surgical removal of a tooth that is impacted, fractured, or has unusual root formations, often requiring the sectioning of the tooth or removal of surrounding bone for successful retrieval.",
      image: CompteImg,
      altText: "Complicated Tooth Extraction"
    },
    {
      title: "Simple Tooth Extraction",
      description: "removal of a fully erupted tooth from its socket using forceps and elevators, typically performed when the tooth is visible and easily accessible.",
      image: SteImg,
      altText: "Simple Tooth Extraction"
    }
  ];

  const navigate = useNavigate();

  const handleServiceClick = (serviceName) => {
    console.log(`Clicked on: ${serviceName}`);
    // navigate to book now
  };

  return (
    <div className={styles['services-page']}>
      <Navbar />
      <div className={styles['services-container']}>

        <div 
          className={`${styles.hero} ${isHeroVisible ? styles.animate : ''}`}
          ref={heroRef}
        >
          <img className={styles.services} src={ServicesImg} />
        </div>

        <div 
          className={`${styles['book-container']} ${isBookVisible ? styles.animate : ''}`}
          ref={bookRef}
        >
          <Button
            className={styles['book-btn']}
            onClick={() => navigate('/booking')}
          >
            Book a service now!
          </Button>
        </div>

        <div 
          className={`${styles['services-grid']} ${isGridVisible ? styles.animate : ''}`}
          ref={gridRef}
        >
          {services.map((service, index) => (
            <Card
              key={index}
              title={service.title}
              description={service.description}
              image={service.image}
              altText={service.altText}
              onClick={handleServiceClick}
              className={styles['service-grid-item']}
              data-index={index}
            />
          ))}
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default Services;