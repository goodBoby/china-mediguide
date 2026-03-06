import type { Department } from './hospitalService';

export const mockDepartments: Department[] = [
    {
        id: 'dept-general',
        name_en: 'General Practice',
        name_zh: '全科',
        keywords: ['fever', 'cold', 'headache', 'fatigue', 'cough', 'pain']
    },
    {
        id: 'dept-neuro',
        name_en: 'Neurology',
        name_zh: '神经内科',
        keywords: ['headache', 'dizzy', 'migraine', 'sleep', 'numbness']
    },
    {
        id: 'dept-gastro',
        name_en: 'Gastroenterology',
        name_zh: '消化内科',
        keywords: ['stomach', 'belly', 'diarrhea', 'vomit', 'nausea', 'ache']
    }
];

export const aiService = {
    /**
     * Mock AI symptom analysis to predict target department
     * In the real app, this would call Google AI Studio (Gemini API)
     */
    async analyzeSymptoms(symptoms: string): Promise<{ department: Department; confidence: number }[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const lowerSymptoms = symptoms.toLowerCase();
                let matched: Department[] = [];

                for (const dept of mockDepartments) {
                    const matchCount = dept.keywords.filter(kw => lowerSymptoms.includes(kw)).length;
                    if (matchCount > 0) {
                        matched.push(dept);
                    }
                }

                if (matched.length === 0) {
                    // Default fallback
                    resolve([{ department: mockDepartments[0], confidence: 0.6 }]);
                } else {
                    // Simplistic ranking mock
                    resolve(matched.map(dept => ({ department: dept, confidence: 0.85 })));
                }
            }, 1500); // simulate AI thinking time
        });
    }
};
