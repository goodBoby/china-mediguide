import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, AlertTriangle, MapPin } from 'lucide-react';
import './Home.css';

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className="hero-section">
                <Stethoscope size={48} className="hero-icon" />
                <h2 className="title">Not feeling well?</h2>
                <p className="subtitle">Tell us your symptoms, we'll guide you to the right department and hospital.</p>

                <button
                    className="action-btn primary-btn"
                    onClick={() => navigate('/chat')}
                >
                    Start Symptom Check
                </button>
            </div>

            <div className="emergency-section">
                <div className="emergency-header">
                    <AlertTriangle size={20} className="danger-icon" />
                    <h3>Emergency?</h3>
                </div>
                <p>If you are experiencing severe chest pain, extreme bleeding, or difficulty breathing, please call emergency services immediately.</p>
                <button
                    className="danger-btn outline"
                    onClick={() => window.location.href = 'tel:120'}
                >
                    Call 120 (Ambulance)
                </button>
            </div>

            <div className="quick-action-section">
                <h3>Know what you need?</h3>
                <button
                    className="action-btn secondary-btn"
                    onClick={() => navigate('/hospitals')}
                >
                    <MapPin size={18} />
                    View International Hospitals
                </button>
            </div>
        </div>
    );
};

export default Home;
