import React from 'react';
import { Empty, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CompanyCreateModal from './CompanyCreateModal';

interface CompanyEmptyStateProps {
  message?: string;
}

const CompanyEmptyState: React.FC<CompanyEmptyStateProps> = ({
  message = 'No companies found',
}) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSuccess = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ margin: '48px 0', textAlign: 'center' }}>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={message}>
        <Button type='primary' icon={<PlusOutlined />} onClick={showModal}>
          Add Your First Company
        </Button>

        <CompanyCreateModal
          visible={isModalVisible}
          onCancel={handleCancel}
          onSuccess={handleSuccess}
        />
      </Empty>
    </div>
  );
};

export default CompanyEmptyState;
