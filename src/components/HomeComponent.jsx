import React from 'react';
import '../Home.css'; 
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className="home-banner" style={{ fontFamily: 'Roboto, sans-serif' }}>
        <div className="overlay">
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Efficient Issue Tracking System</h1>
          <p style={{ fontSize: '1.2rem' }}>Navigate the latest issue tracking techniques and streamline your project</p>
          <div>
            <button className="btn btn-primary">
              <Link to="/" className="text-white">Get Started</Link>
            </button>
          </div>
        </div>
      </div>
      <br/>
        <br/>
      
      <br/>
      <div className="fontimg2"> <div className="scroll-down-content ">
        <h1 style={{ fontFamily: 'Roboto, sans-serif',fontSize:'5.5rem',fontWeight: 'bold' }}>Efficient MERN 
          <br/> Stack Issue 
          <br/>Tracker
        </h1>
        <p style={{ fontFamily: 'Roboto, sans-serif',fontSize:'2.5rem' }}>
          Create, manage, and track software issues with our
            <br/> comprehensive Issue Tracking System built using
            <br/> the MERN stack.
          
        </p>
       
      </div></div>
      <div className="fontimg3"> <p></p></div>
      <div className="fontimg4"> <p></p>
      
       
      </div>
      
    </div>
  );
};

export default Home;
