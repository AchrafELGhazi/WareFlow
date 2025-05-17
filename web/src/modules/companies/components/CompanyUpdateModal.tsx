import React, { useState } from 'react';
import { Modal, Button, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import CompanyUpdateForm from './CompanyUpdateForm';
import type { Company } from '../api/companyApi';

const { Title } = Typography;

interface CompanyUpdateModalProps {
  company: Company;
}

const CompanyUpdateModal: React.FC<CompanyUpdateModalProps> = ({ company }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

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
    <>
      <Button icon={<EditOutlined />} onClick={showModal}>
        Edit
      </Button>
      <Modal
        title={<Title level={4}>Update Company</Title>}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        <CompanyUpdateForm company={company} onSuccess={handleSuccess} />
      </Modal>
    </>
  );
};

export default CompanyUpdateModal;
