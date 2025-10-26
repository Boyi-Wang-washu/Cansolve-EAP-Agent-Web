'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuthStore } from '@/store/authStore';
import { UserRole } from '@/lib/types';

export default function ReportsPage() {
  const { user } = useAuthStore();
  const [selectedReport, setSelectedReport] = useState<any>(null);

  // 模拟报告数据（占位 - 后续从API获取）
  const mockReports = [
    {
      id: '1',
      sessionId: 'session_001',
      materialCode: 'ENG-2025-U1-A',
      materialTitle: 'The Impact of Social Media',
      date: '2024-01-20',
      duration: '25 min',
      score: 85,
      rubric: {
        fluency: 88,
        accuracy: 82,
        vocabulary: 90,
        comprehension: 85,
      },
      summary: '## Performance Summary\n\nYou demonstrated strong comprehension of the material with excellent vocabulary usage...',
    },
    {
      id: '2',
      sessionId: 'session_002',
      materialCode: 'ENG-2025-U2-B',
      materialTitle: 'Climate Change Responsibility',
      date: '2024-01-18',
      duration: '30 min',
      score: 78,
      rubric: {
        fluency: 75,
        accuracy: 80,
        vocabulary: 82,
        comprehension: 76,
      },
      summary: '## Performance Summary\n\nGood effort on this session. Consider working on sentence fluency...',
    },
  ];

  const handleViewReport = (report: any) => {
    setSelectedReport(report);
  };

  const handleCloseReport = () => {
    setSelectedReport(null);
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <nav className="text-sm text-text-secondary mb-2">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span>Learning Reports</span>
        </nav>
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          {user?.role === UserRole.STUDENT ? 'My Learning Reports' : 'Student Reports'}
        </h1>
        <p className="text-text-secondary">
          View detailed performance analysis and learning progress
        </p>
      </div>

      {/* Report List */}
      {!selectedReport ? (
        <div className="space-y-4">
          {mockReports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-xl shadow-card p-6 hover:shadow-card-hover transition-shadow cursor-pointer"
              onClick={() => handleViewReport(report)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-text-primary">
                      {report.materialTitle}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      report.score >= 80 
                        ? 'bg-green-100 text-green-800'
                        : report.score >= 70
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {report.score}%
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-text-secondary mb-4">
                    <span>
                      <i className="fas fa-code mr-1"></i>
                      {report.materialCode}
                    </span>
                    <span>
                      <i className="fas fa-calendar mr-1"></i>
                      {report.date}
                    </span>
                    <span>
                      <i className="fas fa-clock mr-1"></i>
                      {report.duration}
                    </span>
                  </div>

                  {/* Rubric Preview */}
                  <div className="grid grid-cols-4 gap-3">
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-xs text-text-secondary mb-1">Fluency</div>
                      <div className="text-lg font-bold text-primary">{report.rubric.fluency}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-xs text-text-secondary mb-1">Accuracy</div>
                      <div className="text-lg font-bold text-primary">{report.rubric.accuracy}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-xs text-text-secondary mb-1">Vocabulary</div>
                      <div className="text-lg font-bold text-primary">{report.rubric.vocabulary}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-xs text-text-secondary mb-1">Comprehension</div>
                      <div className="text-lg font-bold text-primary">{report.rubric.comprehension}</div>
                    </div>
                  </div>
                </div>

                <button className="ml-6 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}

          {mockReports.length === 0 && (
            <div className="bg-white rounded-xl shadow-card p-12 text-center">
              <i className="fas fa-chart-line text-gray-300 text-5xl mb-4"></i>
              <h3 className="text-xl font-semibold text-text-primary mb-2">No Reports Yet</h3>
              <p className="text-text-secondary mb-6">
                Complete a tutoring session to generate your first learning report
              </p>
              <a
                href="/tutor/select-material"
                className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
              >
                Start a Session
              </a>
            </div>
          )}
        </div>
      ) : (
        // Report Detail View
        <div className="bg-white rounded-xl shadow-card p-8">
          {/* Report Header */}
          <div className="flex items-start justify-between mb-6 pb-6 border-b border-border-light">
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                {selectedReport.materialTitle}
              </h2>
              <div className="flex items-center gap-4 text-sm text-text-secondary">
                <span>
                  <i className="fas fa-code mr-1"></i>
                  {selectedReport.materialCode}
                </span>
                <span>
                  <i className="fas fa-calendar mr-1"></i>
                  {selectedReport.date}
                </span>
                <span>
                  <i className="fas fa-clock mr-1"></i>
                  {selectedReport.duration}
                </span>
              </div>
            </div>
            <button
              onClick={handleCloseReport}
              className="px-4 py-2 border border-border-light text-text-secondary rounded-lg hover:bg-gray-50 transition-colors"
            >
              <i className="fas fa-times mr-2"></i>
              Close
            </button>
          </div>

          {/* Overall Score */}
          <div className="mb-8 text-center">
            <div className="inline-block">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#E5E7EB"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="#1B8C79"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - selectedReport.score / 100)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-primary">{selectedReport.score}%</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-text-primary">Overall Score</h3>
            </div>
          </div>

          {/* Detailed Rubric */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Performance Breakdown</h3>
            <div className="space-y-4">
              {Object.entries(selectedReport.rubric).map(([key, value]: [string, any]) => (
                <div key={key}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-text-primary capitalize">
                      {key}
                    </span>
                    <span className="text-sm font-bold text-primary">{value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
                      style={{ width: `${value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">AI-Generated Summary</h3>
            <div className="prose max-w-none bg-gray-50 rounded-lg p-6">
              <p className="text-text-secondary whitespace-pre-wrap">{selectedReport.summary}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button className="flex-1 px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors">
              <i className="fas fa-download mr-2"></i>
              Download PDF
            </button>
            <button className="flex-1 px-6 py-3 border border-border-light text-text-secondary rounded-lg hover:bg-gray-50 transition-colors">
              <i className="fas fa-share mr-2"></i>
              Share
            </button>
          </div>
        </div>
      )}

      {/* MVP Notice */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          <i className="fas fa-info-circle mr-2"></i>
          <strong>MVP Note:</strong> Report data is placeholder. AI-generated analysis will be implemented in the next phase.
        </p>
      </div>
    </DashboardLayout>
  );
}

