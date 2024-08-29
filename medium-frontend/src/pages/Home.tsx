// Home.tsx
import React from 'react';
import Navbar from '../components/Navbar'; // Adjust the path as needed

const Home: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar /> {/* Add Navbar here */}

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
         <h1 className="text-4xl font-bold mb-4 text-blue-800">Welcome to BlogBloom</h1>
          <p className="text-lg mb-6">
            Discover the ultimate platform to express your thoughts, share your ideas, and connect with a community of passionate writers.
          </p>
          <img
            src=".\images\finalbloomblog.jpg"
            alt="Hero Image"
            className="mx-auto rounded-lg shadow-lg h-96 w-[60%]"
          />
        </section>

        {/* Benefits Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Write Blogs */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <img
              src="https://d11xrvp9l4ngvc.cloudfront.net/images/blogs/Blog_writing.jpg"
              alt="Write Blogs"
               className="mx-auto mb-4 w-64 h-48 object-cover"
            />
            <h2 className="text-2xl font-semibold mb-2">Write Blogs</h2>
            <p>
              Share your thoughts and insights with a global audience. Whether you're an experienced writer or just starting, our platform is perfect for you.
            </p>
          </div>

          {/* Improve Your Writing Skills */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <img 
              src="https://peachyessay.com/wp-content/webp-express/webp-images/uploads/2021/11/ways-to-improve-your-writing-skills.jpeg.webp"
              alt="Improve Skills"
             className="mx-auto mb-4 w-64 h-48 object-cover"
            />
            <h2 className="text-2xl font-semibold mb-2">Improve Your Writing Skills</h2>
            <p>
              Access tips, tools, and resources to enhance your writing. Join workshops and get feedback to grow as a writer.
            </p>
          </div>

          {/* Join Our Community */}
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <img
              src="https://brightweb--all.s3.ap-south-1.amazonaws.com/uploads/allmedia/WhatsApp%20Image%202024-04-05%20at%2015.04.50.jpeg"
              alt="Join Community"
              className="mx-auto mb-4 w-64 h-48 object-cover"

            />
            <h2 className="text-2xl font-semibold mb-2">Join Our Community</h2>
            <p>
              Connect with other writers, participate in discussions, and get inspired by a vibrant community of like-minded individuals.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 BlogBloom. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
