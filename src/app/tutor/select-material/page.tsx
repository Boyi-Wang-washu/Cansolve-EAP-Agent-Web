'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function SelectMaterialPage() {
  const router = useRouter();
  const [materialCode, setMaterialCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStartSession = () => {
    if (!materialCode) {
      alert('Please enter a material code');
      return;
    }
    
    setLoading(true);
    // 创建会话并跳转到对话页面
    router.push(`/tutor/chat?material=${materialCode}`);
  };

  // 模拟常用材料
  const recentMaterials = [
    {
      code: 'ENG-2025-U1-A',
      title: 'The Impact of Social Media on Modern Communication',
      description: 'An exploration of how social media platforms have transformed interpersonal communication...',
      readingTime: '15 min',
    },
    {
      code: 'ENG-2025-U2-B',
      title: 'Climate Change and Global Responsibility',
      description: 'Examining the role of individuals and nations in addressing climate challenges...',
      readingTime: '20 min',
    },
    {
      code: 'ENG-2025-U3-C',
      title: 'Artificial Intelligence in Education',
      description: 'Discussing the potential benefits and risks of AI integration in learning environments...',
      readingTime: '18 min',
    },
  ];

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <nav className="text-sm text-text-secondary mb-2">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span>1v1 Tutoring</span>
          <span className="mx-2">/</span>
          <span>Select Material</span>
        </nav>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Select Reading Material</h1>
        <p className="text-text-secondary">Choose a material to start your 1v1 tutoring session</p>
      </div>

      {/* Material Code Input */}
      <div className="bg-white rounded-xl shadow-card p-6 mb-8">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Enter Material Code</h2>
        <div className="flex gap-4">
          <input
            type="text"
            value={materialCode}
            onChange={(e) => setMaterialCode(e.target.value)}
            placeholder="e.g., ENG-2025-U1-A"
            className="flex-1 px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            onClick={handleStartSession}
            disabled={loading || !materialCode}
            className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Starting...
              </>
            ) : (
              <>
                <i className="fas fa-play mr-2"></i>
                Start Session
              </>
            )}
          </button>
        </div>
      </div>

      {/* Recent Materials */}
      <div className="bg-white rounded-xl shadow-card p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Recent Materials</h2>
        <div className="space-y-4">
          {recentMaterials.map((material) => (
            <div
              key={material.code}
              className="border border-border-light rounded-lg p-4 hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer"
              onClick={() => {
                setMaterialCode(material.code);
                router.push(`/tutor/chat?material=${material.code}`);
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-text-primary mb-2">{material.title}</h3>
                  <p className="text-sm text-text-secondary mb-3">{material.description}</p>
                  <div className="flex items-center gap-4 text-xs text-text-secondary">
                    <span>
                      <i className="fas fa-code mr-1"></i>
                      {material.code}
                    </span>
                    <span>
                      <i className="fas fa-clock mr-1"></i>
                      {material.readingTime}
                    </span>
                  </div>
                </div>
                <button className="ml-4 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

