import React from 'react'
import cera from "../../assets/brands/cerave.jpeg";
import ordinary from "../../assets/brands/ordinary.jpeg";
import cosrx from "../../assets/brands/cosrx.jpeg";
import laroche from "../../assets/brands/laroche.jpeg";
import ola from "../../assets/brands/olaplex.jpeg";
import euc from "../../assets/brands/eucerin.jpeg";
import nuet from "../../assets/brands/nuetrogena.jpeg";

const Brands = () => {
  const logos = [cera, ola, nuet, euc, laroche, cosrx, ordinary,cera, ola, nuet, euc, laroche, cosrx, ordinary];

  return (
    <div className="overflow-hidden mt-6">
      <div className="flex animate-marquee gap-4">
        {logos.concat(logos).map((logo, index) => (
          <img key={index} className="h-[100px] rounded-4xl" src={logo} />
        ))}
      </div>
    </div>
  )
}

export default Brands;
