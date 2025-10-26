'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function TeacherMaterialsPage() {
  const [materials, setMaterials] = useState([
    // 模拟数据
    {
      id: '1',
      code: 'ENG-2025-U1-A',
      title: 'The Impact of Social Media',
      version: 1,
      uploadedAt: '2024-01-15',
      status: 'active',
    },
    {
      id: '2',
      code: 'ENG-2025-U2-B',
      title: 'Climate Change Responsibility',
      version: 1,
      uploadedAt: '2024-01-10',
      status: 'active',
    },
  ]);

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <nav className="text-sm text-text-secondary mb-2">
          <span>Home</span>
          <span className="mx-2">/</span>
          <span>Teacher Tools</span>
          <span className="mx-2">/</span>
          <span>Materials</span>
        </nav>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Material Management</h1>
        <p className="text-text-secondary">Upload and manage reading materials for your students</p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search materials..."
            className="px-4 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select className="px-4 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        <a 
          href="/teacher/materials/upload"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors inline-block"
        >
          <i className="fas fa-plus mr-2"></i>
          Upload Material
        </a>
      </div>

      {/* Materials Table */}
      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-border-light">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Version
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Uploaded
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-light">
            {materials.map((material) => (
              <tr key={material.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-text-primary">{material.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-secondary">{material.code}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-secondary">v{material.version}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-text-secondary">{material.uploadedAt}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {material.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button className="text-primary hover:text-secondary mr-3">
                    <i className="fas fa-eye"></i>
                  </button>
                  <button className="text-primary hover:text-secondary mr-3">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MVP Notice */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          <i className="fas fa-info-circle mr-2"></i>
          <strong>MVP Note:</strong> Material upload and management features are placeholders. Full implementation will include file processing and text extraction.
        </p>
      </div>
    </DashboardLayout>
  );
}

