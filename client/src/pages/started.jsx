import React, { useState } from 'react';

const Started = () => {
  const images = [
    "https://images.unsplash.com/photo-1602537743378-79a0eaf6fca7",
    "https://images.pexels.com/photos/3861961/pexels-photo-3861961.jpeg",
    "https://images.unsplash.com/photo-1521747116042-df4b7de1cbd4",
    "https://images.pexels.com/photos/3182762/pexels-photo-3182762.jpeg",
    "https://images.pexels.com/photos/4060439/pexels-photo-4060439.jpeg",
    "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG1vbmdvZGIlMjBhbmQlMjBub2RlanN8ZW58MHx8MHx8fDA%3D",
    "https://images.pexels.com/photos/3759447/pexels-photo-3759447.jpeg",
    "https://plus.unsplash.com/premium_photo-1678566111481-8e275550b700?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHRlY2h8ZW58MHx8MHx8fDA%3D",
    "https://plus.unsplash.com/premium_photo-1678566111481-8e275550b700?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHRlY2h8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1580983703451-bf6bb44a9917?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNvZnR3YXJlfGVufDB8fDB8fHww",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prevImage) => (prevImage - 1 + images.length) % images.length
    );
  };

  return (
    <div className="bg-gradient-to-r from-purple-800 via-blue-500 to-teal-400 text-white">
      {/* Header Section */}
      <header className="text-center py-24">
        <h1 className="text-5xl font-extrabold tracking-tight mb-6">
          Welcome to Coding Stars
        </h1>
        <p className="text-xl mb-4 max-w-3xl mx-auto">
          We provide cutting-edge coding solutions, learning resources, and mentorship to help developers create innovative, impactful solutions.
        </p>
        <a
          href="#services"
          className="inline-block py-3 px-6 bg-yellow-500 text-gray-800 rounded-full text-lg font-semibold hover:bg-yellow-600 transition ease-in-out"
        >
          Discover Our Services
        </a>
      </header>

      {/* Carousel Section */}
      <section id="carousel" className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Our Latest Projects</h2>
        <div className="relative w-full max-w-3xl mx-auto">
          {/* Image Display */}
          <div className="w-full h-64 overflow-hidden rounded-lg">
            <img
              src={images[currentImage]}
              alt="Coding Concept"
              className="w-full h-full object-cover transition-all duration-500 ease-in-out transform hover:scale-110"
            />
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-4 rounded-full hover:bg-opacity-75"
          >
            &#10094;
          </button>
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-4 rounded-full hover:bg-opacity-75"
          >
            &#10095;
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-4">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 mx-2 rounded-full cursor-pointer ${
                currentImage === index ? 'bg-yellow-500' : 'bg-white opacity-50'
              }`}
            ></div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800">What is Coding Stars?</h2>
        <p className="text-lg text-gray-300 mt-4 mb-8 max-w-2xl mx-auto">
          Coding Stars is a dynamic software development company providing powerful coding solutions. Whether you are a beginner looking to learn the ropes of programming or an enterprise seeking advanced solutions, we’ve got you covered. Our expertise spans across software development, coding mentorship, and more.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-12">
          {/* Image 1 */}
          <div className="overflow-hidden rounded-lg shadow-xl transform hover:scale-105 transition duration-500">
            <img
              src="https://plus.unsplash.com/premium_photo-1678565999332-1cde462f7b24?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fGNvZGVyc3xlbnwwfHwwfHx8MA%3D%3D"
              alt="Coding Workspace"
              className="w-full h-64 object-cover transition-transform duration-500 ease-in-out hover:scale-110"
            />
          </div>
          {/* Image 2 */}
          <div className="overflow-hidden rounded-lg shadow-xl transform hover:scale-105 transition duration-500">
            <img
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D"
              alt="Tech Innovation"
              className="w-full h-64 object-cover transition-transform duration-500 ease-in-out hover:scale-110"
            />
          </div>
          {/* Image 3 */}
          <div className="overflow-hidden rounded-lg shadow-xl transform hover:scale-105 transition duration-500">
            <img
              src="https://images.unsplash.com/photo-1581092922699-2766a7278454?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEwfHx0ZWNobm9sb2d5fGVufDB8fDB8fHww"
              alt="Software Engineering"
              className="w-full h-64 object-cover transition-transform duration-500 ease-in-out hover:scale-110"
            />
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why" className="py-16 px-6 bg-gray-800 text-white text-center">
        <h2 className="text-3xl font-semibold mb-6">Why Choose Coding Stars?</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          At Coding Stars, we believe in delivering quality solutions that meet the highest industry standards. Our team is dedicated to providing innovative solutions with a focus on performance, security, and user experience.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">Expert Developers</h3>
            <p>
              Our team of expert developers has years of experience working with the latest technologies to build scalable and robust applications.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">Innovative Solutions</h3>
            <p>
              We use innovative approaches to solve complex problems, ensuring that our clients get the best and most modern solutions for their needs.
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">Customer-Centric Approach</h3>
            <p>
              We prioritize understanding our clients' unique needs and work closely with them to create custom solutions that truly add value to their business.
            </p>
          </div>
        </div>
      </section>

      {/* Technologies We Use Section */}
      <section id="technologies" className="py-16 px-6 bg-gray-900 text-white text-center">
        <h2 className="text-3xl font-semibold mb-6">Technologies We Use</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          We leverage the most advanced technologies and tools to ensure that our solutions are cutting-edge, scalable, and secure.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-12">
          <div className="flex flex-col items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
              alt="JavaScript"
              className="w-20 mb-4"
            />
            <p>JavaScript</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
              alt="React"
              className="w-20 mb-4"
            />
            <p>React</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwtRYtCTbWKiIcLtwlwqhIBhfxFaM_IDtWRQ&s"
              alt="MongoDB"
              className="w-20 mb-4"
            />
            <p>MongoDB</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://images.ctfassets.net/aq13lwl6616q/7cS8gBoWulxkWNWEm0FspJ/c7eb42dd82e27279307f8b9fc9b136fa/nodejs_cover_photo_smaller_size.png"
              alt="Node.js"
              className="w-20 mb-4"
            />
            <p>Node.js</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 px-6 bg-gray-800 text-white text-center">
        <h2 className="text-3xl font-semibold mb-6">Client Testimonials</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Hear what our clients have to say about their experiences with Coding Stars.
        </p>
        <div className="flex justify-center">
          <div className="max-w-lg p-6 bg-gray-700 rounded-lg shadow-lg">
            <p className="italic mb-4">
              "Working with Coding Stars was an amazing experience. Their team is incredibly talented and delivered exactly what we needed on time!"
            </p>
            <p className="font-semibold">Jane Doe</p>
            <p>CEO, Tech Innovations</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 text-center">
        <p className="text-sm">&copy; 2024 Coding Stars. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Started;
