import Card from '../components/Card';
import styles from './Services.module.css';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Footer from '../components/Footer';
import { useEffect, useRef, useState } from 'react';

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
      image: "/images/consultation.png",
      altText: "Consultation"
    },
    {
      title: "Oral Prophylaxis",
      description: "removes plaque, tartar, and stains from teeth to prevent oral diseases and maintain healthy gums.",
      image: "/images/op.jpg",
      altText: "Oral Prophylaxis"
    },
    {
      title: "Oral Prophylaxis with Fluoride",
      description: "includes the application of fluoride to strengthen tooth enamel and prevent decay after the removal of plaque, tartar, and stains.",
      image: "/images/opf.jpg",
      altText: "Oral Prophylaxis with Fluoride"
    },
    {
      title: "Deep Scaling",
      description: "cleans below the gum line to remove hardened plaque and tartar from tooth roots.",
      image: "/images/ds.jpg",
      altText: "Deep Scaling"
    },
    {
      title: "Panoramic Radiograph",
      description: "wide-view x-ray that captures the entire mouth in a single image, including all the teeth, upper and lower jaws, and surrounding structures.",
      image: "/images/pano.png",
      altText: "Panoramic Radiograph"
    },
    {
      title: "Complicated Tooth Filling",
      description: "restoration of a larger or more intricate area of tooth decay, often requiring additional steps or materials to ensure proper structure and function.",
      image: "/images/comptf.jpg",
      altText: "Complicated Tooth Filling"
    },
    {
      title: "Odontectomy",
      description: "surgical removal of a tooth, typically impacted or problematic teeth like wisdom teeth, from the jawbone and surrounding tissues.",
      image: "/images/od.jpg",
      altText: "Odontectomy"
    },
    {
      title: "Temporary Filling",
      description: "short-term dental restoration used to protect a tooth after certain procedures or until a permanent filling can be placed.",
      image: "/images/tf.jpg",
      altText: "Temporary Filling"
    },
    {
      title: "Root Canal Treatment",
      description: "removing the infected or damaged pulp from the inside of a tooth, cleaning and shaping the canal, and then filling and sealing it to prevent further infection and save the tooth.",
      image: "/images/rct.jpg",
      altText: "Root Canal Treatment"
    },
    {
      title: "Periapical Radiograph",
      description: "dental x-ray that captures a detailed view of a single tooth and the surrounding bone from the crown to the root tip.",
      image: "/images/peria.jpg",
      altText: "Periapical Radiograph"
    },
    {
      title: "Teeth Whitening",
      description: "cosmetic dental procedure that lightens the shade of teeth by removing stains and discoloration from the enamel and dentin.",
      image: "/images/tw.jpg",
      altText: "Teeth Whitening"
    },
    {
      title: "Simple Tooth Filling",
      description: "cleaning and restoring a small area of tooth decay with a filling material to protect the tooth and prevent further damage.",
      image: "/images/stf.jpg",
      altText: "Simple Tooth Filling"
    },
    {
      title: "Pit & Fissure Sealant",
      description: "protective plastic coating applied to the chewing surfaces of back teeth to prevent cavities by sealing grooves and crevices where food and bacteria can accumulate.",
      image: "/images/pfs.jpg",
      altText: "Pit & Fissure Sealant"
    },
    {
      title: "Dental Implant",
      description: "a surgical component, typically made of titanium, that is placed into the jawbone to support a dental prosthesis such as a crown, bridge, or denture, effectively replacing a missing tooth root.",
      image: "/images/di.jpg",
      altText: "Dental Implant"
    },
    {
      title: "Complicated Tooth Extraction",
      description: "surgical removal of a tooth that is impacted, fractured, or has unusual root formations, often requiring the sectioning of the tooth or removal of surrounding bone for successful retrieval.",
      image: "/images/compte.jpg",
      altText: "Complicated Tooth Extraction"
    },
    {
      title: "Simple Tooth Extraction",
      description: "removal of a fully erupted tooth from its socket using forceps and elevators, typically performed when the tooth is visible and easily accessible.",
      image: "/images/ste.jpg",
      altText: "Simple Tooth Extraction"
    }
  ];

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
          <img className={styles.services} src="services.png" />
        </div>

        <div 
          className={`${styles['book-container']} ${isBookVisible ? styles.animate : ''}`}
          ref={bookRef}
        >
          <Button className={styles['book-btn']}>Book a service now!</Button>
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