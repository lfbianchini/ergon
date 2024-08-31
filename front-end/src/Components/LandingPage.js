import React from 'react'
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'

function LandingPage() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/login');
      };

    return (
        <div className='Landing-Page'>
            <h1 className='landing-title'>ergon</h1>
            <button className='landing-button' onClick={handleButtonClick}>
                get started
            </button>
        </div>
    )
}

export default LandingPage;