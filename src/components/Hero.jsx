import React from 'react';
// import SocialLinks from './SocialLinks';

const Hero = () => {
  return (
    <div className="mt-20">
      <div className="p-2 md:p-0 flex flex-col items-center">
        <h1 className="max-w-sm md:max-w-xl lg:max-w-4xl text-3xl md:text-4xl lg:text-6xl text-center font-medium">
          I help startups ship fast without compromising quality.
        </h1>
        <p className="mt-2 xl:mt-5 font-normal text-sm sm:text-sm md:text-md xl:text-xl max-w-sm md:max-w-md xl:max-w-2xl text-center opacity-50">
          As a Software Developer, I specialize in high-speed, top-tier development. I am the go-to professional for swiftly transforming challenges and opportunities into user-friendly solutions through design and code.
        </p>
        <button
          className="relative gradient-border m-1 px-3 py-2 rounded-xl flex items-center justify-center bg-black hover:bg-white hover:text-black opacity-95 hover:opacity-100 text-white mt-5 px-5 py-3 md:px-8 md:py-3 text-xl"
          onClick={() => window.location.href = 'mailto:your-email@example.com'}
        >
          Book a Free Discovery Call
        </button>
        {/* <SocialLinks /> */}
      </div>
    </div>
  );
};

export default Hero;