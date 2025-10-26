'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function UploadMaterialPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    file: null as File | null,
  });
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData({ ...formData, file: e.dataTransfer.files[0] });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.file) {
      alert('Please select a file to upload');
      return;
    }

    setUploading(true);

    // 模拟上传延迟
    await new Promise(resolve => setTimeout(resolve, 2000));

    // TODO: 实际上传逻辑
    console.log('Uploading material:', formData);

    setUploading(false);
    alert('Material uploaded successfully! (Placeholder)');
    router.push('/teacher/materials');
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <nav className="text-sm text-text-secondary mb-2">
          <a href="/dashboard" className="hover:text-primary">Home</a>
          <span className="mx-2">/</span>
          <a href="/teacher/materials" className="hover:text-primary">Materials</a>
          <span className="mx-2">/</span>
          <span>Upload</span>
        </nav>
        <h1 className="text-3xl font-bold text-text-primary mb-2">Upload New Material</h1>
        <p className="text-text-secondary">
          Upload reading materials for your students (PDF, DOC, DOCX, TXT)
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload Area */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Select File</h2>
            
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                dragActive
                  ? 'border-primary bg-primary/5'
                  : 'border-border-light hover:border-primary hover:bg-gray-50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {formData.file ? (
                <div>
                  <i className="fas fa-file-alt text-primary text-5xl mb-4"></i>
                  <p className="text-lg font-medium text-text-primary mb-2">
                    {formData.file.name}
                  </p>
                  <p className="text-sm text-text-secondary mb-4">
                    {(formData.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, file: null })}
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    <i className="fas fa-times mr-1"></i>
                    Remove file
                  </button>
                </div>
              ) : (
                <div>
                  <i className="fas fa-cloud-upload-alt text-gray-300 text-5xl mb-4"></i>
                  <p className="text-lg font-medium text-text-primary mb-2">
                    Drag and drop your file here
                  </p>
                  <p className="text-sm text-text-secondary mb-4">or</p>
                  <label className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors cursor-pointer">
                    <i className="fas fa-folder-open mr-2"></i>
                    Browse Files
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="text-xs text-text-secondary mt-4">
                    Supported formats: PDF, DOC, DOCX, TXT (Max 50MB)
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Material Information */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Material Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., The Impact of Social Media on Communication"
                  className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the material content..."
                  rows={4}
                  className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="e.g., grammar, past tense, intermediate"
                  className="w-full px-4 py-3 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-3 border border-border-light text-text-secondary rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading || !formData.file || !formData.title}
              className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Uploading...
                </>
              ) : (
                <>
                  <i className="fas fa-upload mr-2"></i>
                  Upload Material
                </>
              )}
            </button>
          </div>
        </form>

        {/* MVP Notice */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700">
            <i className="fas fa-info-circle mr-2"></i>
            <strong>MVP Note:</strong> File upload is a placeholder. Text extraction and processing will be implemented in the next phase.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}

