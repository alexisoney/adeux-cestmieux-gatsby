import React, { useEffect, useState } from 'react';
import CallToAction from '../CallToAction';

export const ipDataApi = 'https://api.ipdata.co/?api-key=0d04a9cd3ac8f7f5e87a2d1935c3c11d02e3773cba65a86dc93b3f8e';

export const HelloFresh = () => {
  const image = "https://res.cloudinary.com/studio-basilic-tropical/image/upload/v1587292833/adeux-cestmieux/hellofresh-discount-1600w_ofupjs.webp";
  const button = "Commander avec les réductions";

  const content = {}

  content.FR = {
    title: 'Au total, 60€ de réduction',
    link:"https://www.hellofresh.fr?c=CLMTAI&utm_source=raf-share&utm_medium=referral&utm_campaign=clipboard",
    description:"25€ de réduction sur votre première box, 20€ sur la seconde et 15€ sur la troisième."
  }

  content.BE = {
    title: '20€ de réduction',
    link:"https://www.hellofresh.be/?c=HS-CP6NY1NEV&utm_source=raf-share&utm_medium=referral&utm_campaign=clipboard",
    description:"20€ de réduction sur votre première box."
  };
  
  content.NL = {
    title: "25€ de réduction",
    link:"https://www.hellofresh.nl?c=CLMTAI&utm_source=raf-share&utm_medium=referral&utm_campaign=clipboard",
    description:"25€ de réduction sur votre première box."
  };

  const [title, setTitle] = useState(content.FR.title);
  const [link, setLink] = useState(content.FR.link);
  const [description, setDescription] = useState(content.FR.description);

  useEffect(() => {
    const checkLocalisation = async () => {
      try {
        let countryCode = localStorage.getItem('countryCode');

        if(!countryCode) {
          const response = await fetch(ipDataApi);
          const json = await response.json();
          countryCode = json && json.country_code;
          localStorage.setItem('countryCode', countryCode);
        }

        if(['BE','NL'].includes(countryCode)) {
          setTitle(content[countryCode].title);
          setLink(content[countryCode].link);
          setDescription(content[countryCode].description);
        }
      } catch(err) {}
    }
    
    checkLocalisation();
  })

  return (
    <CallToAction 
      button={button}
      description={`Grâce à notre lien de parrainage, vous bénéficiez de ${description} Idéal pour découvrir !`}
      image={image}
      link={link}
      title={title}
    />
  )
}

export default HelloFresh;
