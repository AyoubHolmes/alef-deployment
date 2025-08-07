import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ContentEditor from '@/components/admin/ContentEditor';

const AdminContentManager: React.FC = () => {
  return (
    <AdminLayout>
      <ContentEditor />
    </AdminLayout>
  );
};

export default AdminContentManager;