import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Globe2, MapPin } from 'lucide-react';
import './HospitalList.css';

// Mock data matching the proposed Supabase model
const mockHospitals = [
    {
        id: 'hosp-1',
        name_en: 'Beijing United Family Hospital',
        name_zh: '北京和睦家医院',
        address_en: '2 Jiangtai Road, Chaoyang District, Beijing',
        address_zh: '北京市朝阳区将台路2号',
        has_english_service: true,
        distance: '3.2 km',
        registration_method: 'WeChat Mini Program'
    },
    {
        id: 'hosp-2',
        name_en: 'Peking Union Medical College Hospital (International)',
        name_zh: '北京协和医院 (国际医疗部)',
        address_en: '1 Shuaifuyuan, Dongcheng District, Beijing',
        address_zh: '北京市东城区帅府园1号',
        has_english_service: true,
        distance: '5.8 km',
        registration_method: 'Official App'
    },
    {
        id: 'hosp-3',
        name_en: 'Sino-Japanese Friendship Hospital',
        name_zh: '中日友好医院',
        address_en: '2 Yinghua East Street, Chaoyang District, Beijing',
        address_zh: '北京市朝阳区樱花园东街2号',
        has_english_service: false,
        distance: '2.1 km',
        registration_method: 'WeChat Official Account'
    }
];

const HospitalList: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="hospital-list-container">
            <div className="list-header">
                <h2 className="title">Recommended Hospitals</h2>
                <p className="subtitle">Found 3 hospitals with <span className="highlight">General Practice</span> nearby</p>
            </div>

            <div className="card-list">
                {mockHospitals.map(hosp => (
                    <div
                        key={hosp.id}
                        className="hospital-card"
                        onClick={() => navigate(`/redirect/${hosp.id}`)}
                    >
                        <div className="card-top">
                            <div className="hosp-icon">
                                <Building2 size={24} color="var(--primary)" />
                            </div>
                            <div className="hosp-info">
                                <h3>{hosp.name_en}</h3>
                                <h4 className="zh-name">{hosp.name_zh}</h4>
                            </div>
                        </div>

                        <div className="card-tags">
                            {hosp.has_english_service && (
                                <span className="tag bg-green">
                                    <Globe2 size={12} />
                                    English Service
                                </span>
                            )}
                            <span className="tag outline">
                                <MapPin size={12} />
                                {hosp.distance}
                            </span>
                        </div>

                        <div className="card-address">
                            <p>{hosp.address_zh}</p>
                            <p className="en-address">{hosp.address_en}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HospitalList;
