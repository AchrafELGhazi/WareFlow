import React, { useState } from 'react';
import { Modal, Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import CompanyCreateForm from './CompanyCreateForm';

const { Title } = Typography;

interface CompanyCreateModalProps {
  visible?: boolean;
  onCancel?: () => void;
  onSuccess?: () => void;
}

const CompanyCreateModal: React.FC<CompanyCreateModalProps> = ({
  visible: externalVisible,
  onCancel: externalOnCancel,
  onSuccess: externalOnSuccess,
}) => {
  const [internalVisible, setInternalVisible] = useState(false);

  // Determine if the component is controlled externally or internally
  const isControlled = externalVisible !== undefined;
  const isVisible = isControlled ? externalVisible : internalVisible;

  const showModal = () => {
    if (!isControlled) {
      setInternalVisible(true);
    }
  };

  const handleCancel = () => {
    if (isControlled && externalOnCancel) {
      externalOnCancel();
    } else {
      setInternalVisible(false);
    }
  };

  const handleSuccess = () => {
    if (isControlled && externalOnSuccess) {
      externalOnSuccess();
    } else {
      setInternalVisible(false);
    }
  };

  return (
    <>
      {!isControlled && (
        <Button type='primary' icon={<PlusOutlined />} onClick={showModal}>
          Add Company
        </Button>
      )}
      <Modal
        title={<Title level={4}>Create New Company</Title>}
        open={isVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <CompanyCreateForm onSuccess={handleSuccess} />
      </Modal>
    </>
  );
};

export default CompanyCreateModal;
