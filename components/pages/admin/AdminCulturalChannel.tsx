import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import CulturalChannelManager from '@/components/admin/CulturalChannelManager';

const AdminCulturalChannel: React.FC = () => {
  return (
    <AdminLayout>
      <CulturalChannelManager />
    </AdminLayout>
  );
};

export default AdminCulturalChannel;