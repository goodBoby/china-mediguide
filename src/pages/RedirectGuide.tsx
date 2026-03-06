import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Copy, CheckCircle2, MessageCircle, QrCode } from 'lucide-react';
import './RedirectGuide.css';

// Added qrCodeUrl pointing to their official sites for demo (converted to QR)
const mockHospitalUrls: Record<string, any> = {
    'hosp-1': {
        name: 'Beijing United Family Hospital',
        method: 'WeChat Mini Program',
        searchKw: '北京和睦家',
        qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://beijing.ufh.com.cn/'
    },
    'hosp-2': {
        name: 'Peking Union Medical College Hospital',
        method: 'Official App / Website',
        searchKw: '北京协和医院',
        qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://www.pumch.cn/en.html'
    },
    'hosp-3': {
        name: 'Sino-Japanese Friendship Hospital',
        method: 'WeChat Official Account',
        searchKw: '中日友好医院',
        qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://english.zryhyy.com.cn/'
    }
};

const RedirectGuide: React.FC = () => {
    const { hospitalId } = useParams<{ hospitalId: string }>();
    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState<'search' | 'scan'>('search');

    const info = hospitalId && mockHospitalUrls[hospitalId]
        ? mockHospitalUrls[hospitalId]
        : mockHospitalUrls['hosp-1']; // Fallback

    const handleCopy = () => {
        if (info.searchKw) {
            navigator.clipboard.writeText(info.searchKw);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const openWeChat = () => {
        // Universal scheme to open WeChat main app (does not require AppID)
        window.location.href = 'weixin://';
    };

    return (
        <div className="redirect-container">
            <div className="guide-card">
                <div className="guide-header">
                    <h2>Registration Guide</h2>
                    <p className="subtitle">For {info.name}</p>
                </div>

                <div className="tabs">
                    <button
                        className={`tab-btn ${activeTab === 'search' ? 'active' : ''}`}
                        onClick={() => setActiveTab('search')}
                    >
                        Method 1: Search
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'scan' ? 'active' : ''}`}
                        onClick={() => setActiveTab('scan')}
                    >
                        Method 2: Scan QR
                    </button>
                </div>

                {activeTab === 'search' && (
                    <div className="tab-content step-flow">
                        <div className="step-item">
                            <div className="step-number">1</div>
                            <div className="step-detail">
                                <h3>Copy the Keyword</h3>
                                <p>Tap below to copy the hospital's Chinese name.</p>
                                <div className="copy-box" onClick={handleCopy}>
                                    <span className="kw">{info.searchKw}</span>
                                    {copied ? <CheckCircle2 size={18} color="var(--secondary)" /> : <Copy size={18} className="text-muted" />}
                                </div>
                            </div>
                        </div>

                        <div className="step-item">
                            <div className="step-number">2</div>
                            <div className="step-detail">
                                <h3>Open WeChat & Paste</h3>
                                <p>Paste the keyword in WeChat's top search bar to find their Mini Program / Account.</p>
                                <button
                                    className="action-btn primary-btn wechat-btn"
                                    onClick={openWeChat}
                                >
                                    <MessageCircle size={18} />
                                    <span>Open WeChat</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'scan' && (
                    <div className="tab-content qr-flow">
                        <h3>Save & Scan with WeChat</h3>
                        <p>Long press the QR code below to save it, then use WeChat's "Scan" feature and select from Album.</p>
                        <div className="qr-wrapper">
                            <img src={info.qrCodeUrl} alt={`QR Code for ${info.name}`} className="qr-image" />
                        </div>
                        <button
                            className="action-btn primary-btn wechat-btn"
                            onClick={openWeChat}
                        >
                            <QrCode size={18} />
                            <span>Open WeChat to Scan</span>
                        </button>
                    </div>
                )}

                <div className="actions">
                    <button
                        className="action-btn secondary-btn"
                        onClick={() => navigate('/hospitals')}
                    >
                        Back to List
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RedirectGuide;
