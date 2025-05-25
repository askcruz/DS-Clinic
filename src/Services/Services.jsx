import Card from '../components/Card';
import styles from './Services.module.css';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import Footer from '../components/Footer';


const Services = () => {
  const services = [
    {
      title: "Consultation",
      description: "meeting to seek advice, discuss concerns, or receive guidance on dental matters.",
      image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&h=400&fit=crop&crop=center",
      altText: "Consultation"
    },
    {
      title: "Oral Prophylaxis",
      description: "removes plaque, tartar, and stains from teeth to prevent oral diseases and maintain healthy gums.",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=400&fit=crop&crop=center",
      altText: "Oral Prophylaxis"
    },
    {
      title: "Oral Prophylaxis with Fluoride",
      description: "includes the application of fluoride to strengthen tooth enamel and prevent decay after the removal of plaque, tartar, and stains.",
      image: "https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=600&h=400&fit=crop&crop=center",
      altText: "Oral Prophylaxis with Fluoride"
    },
    {
      title: "Deep Scaling",
      description: "cleans below the gum line to remove hardened plaque and tartar from tooth roots.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop&crop=center",
      altText: "Deep Scaling"
    },
    {
      title: "Panoramic Radiograph",
      description: "wide-view x-ray that captures the entire mouth in a single image, including all the teeth, upper and lower jaws, and surrounding structures.",
      image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=400&fit=crop&crop=center",
      altText: "Panoramic Radiograph"
    },
    {
      title: "Complicated Tooth Filling",
      description: "restoration of a larger or more intricate area of tooth decay, often requiring additional steps or materials to ensure proper structure and function.",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop&crop=center",
      altText: "Complicated Tooth Filling"
    },
    {
      title: "Odontectomy",
      description: "surgical removal of a tooth, typically impacted or problematic teeth like wisdom teeth, from the jawbone and surrounding tissues.",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop&crop=center",
      altText: "Odontectomy"
    },
    {
      title: "Temporary Filling",
      description: "short-term dental restoration used to protect a tooth after certain procedures or until a permanent filling can be placed.",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop&crop=center",
      altText: "Temporary Filling"
    },
    {
      title: "Root Canal Treatment",
      description: "removing the infected or damaged pulp from the inside of a tooth, cleaning and shaping the canal, and then filling and sealing it to prevent further infection and save the tooth.",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop&crop=center",
      altText: "Root Canal Treatment"
    },
    {
      title: "Periapical Radiograph",
      description: "dental x-ray that captures a detailed view of a single tooth and the surrounding bone from the crown to the root tip.",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop&crop=center",
      altText: "Periapical Radiograph"
    },
    {
      title: "Teeth Whitening",
      description: "cosmetic dental procedure that lightens the shade of teeth by removing stains and discoloration from the enamel and dentin.",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop&crop=center",
      altText: "Teeth Whitening"
    },
    {
      title: "Simple Tooth Filling",
      description: "cleaning and restoring a small area of tooth decay with a filling material to protect the tooth and prevent further damage.",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop&crop=center",
      altText: "Simple Tooth Filling"
    },
    {
      title: "Pit & Fissure Sealant",
      description: "protective plastic coating applied to the chewing surfaces of back teeth to prevent cavities by sealing grooves and crevices where food and bacteria can accumulate.",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop&crop=center",
      altText: "Pit & Fissure Sealant"
    },
    {
      title: "Dental Implant",
      description: "a surgical component, typically made of titanium, that is placed into the jawbone to support a dental prosthesis such as a crown, bridge, or denture, effectively replacing a missing tooth root.",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop&crop=center",
      altText: "Dental Implant"
    },
    {
      title: "Complicated Tooth Extraction",
      description: "surgical removal of a tooth that is impacted, fractured, or has unusual root formations, often requiring the sectioning of the tooth or removal of surrounding bone for successful retrieval.",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop&crop=center",
      altText: "Complicated Tooth Extraction"
    },
    {
      title: "Simple Tooth Extraction",
      description: "removal of a fully erupted tooth from its socket using forceps and elevators, typically performed when the tooth is visible and easily accessible.",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop&crop=center",
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

        <div className={styles.hero}>
          <img className={styles.services} src="services.png" />
        </div>

        <div className={styles['book-container']}>
          <Button className={styles['book-btn']}>Book a service now!</Button>
        </div>

        <div className={styles['services-grid']}>
          {services.map((service, index) => (
            <Card
              key={index}
              title={service.title}
              description={service.description}
              image={service.image}
              altText={service.altText}
              onClick={handleServiceClick}
              className={styles['service-grid-item']}
            />
          ))}
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default Services;
