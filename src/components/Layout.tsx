import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import './Layout.css';

const Layout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isHome = location.pathname === '/';

    return (
        <div className="layout-container">
            <header className="layout-header">
                {!isHome && (
                    <button
                        onClick={() => navigate(-1)}
                        className="back-btn"
                        aria-label="Go back"
                    >
                        <ChevronLeft size={24} />
                    </button>
                )}
                <h1 className="header-title">China MediGuide</h1>
                <div className="header-spacer" />
            </header>

            <main className="layout-content">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
