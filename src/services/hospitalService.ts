export interface Hospital {
    id: string;
    name_en: string;
    name_zh: string;
    address_en: string;
    address_zh: string;
    has_english_service: boolean;
    distance: string;
    registration_method: string;
}

export interface Department {
    id: string;
    name_en: string;
    name_zh: string;
    keywords: string[];
}

// Mock Data Models
export const mockHospitals: Hospital[] = [
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
        name_en: 'Peking Union Medical College Hospital (Intl)',
        name_zh: '北京协和医院国际医疗部',
        address_en: '1 Shuaifuyuan, Dongcheng District, Beijing',
        address_zh: '北京市东城区帅府园1号',
        has_english_service: true,
        distance: '5.8 km',
        registration_method: 'Official App / Website'
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

export const hospitalService = {
    /**
     * Mock fetching hospitals (can be replaced with Supabase call later)
     */
    async getHospitals(_departmentId?: string): Promise<Hospital[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                // In real app, filter by department. For MVP, return all.
                resolve(mockHospitals);
            }, 500); // simulate network latency
        });
    },

    async getHospitalById(id: string): Promise<Hospital | undefined> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockHospitals.find(h => h.id === id));
            }, 300);
        });
    }
};
