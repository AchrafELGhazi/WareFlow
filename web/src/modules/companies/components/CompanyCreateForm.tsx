import React from 'react';
import { useCreateCompanyMutation } from '../api/companyApi';
import { Form, Input, DatePicker, Button, message } from 'antd';
import moment from 'moment';
import type { CreateCompanyRequest } from '../api/companyApi';

interface CompanyFormValues {
  companyName: string;
  companyDescription: string;
  taxId: string;
  industry: string;
  website: string;
  foundedDate: moment.Moment;
  managerName: string;
}

interface CompanyCreateFormProps {
  onSuccess?: () => void;
}

const CompanyCreateForm: React.FC<CompanyCreateFormProps> = ({ onSuccess }) => {
  const [form] = Form.useForm();
  const [createCompany, { isLoading }] = useCreateCompanyMutation();

  const handleSubmit = async (values: CompanyFormValues) => {
    try {
      const formattedValues: CreateCompanyRequest = {
        ...values,
        foundedDate: values.foundedDate.format('YYYY-MM-DD'),
      };

      await createCompany(formattedValues).unwrap();
      message.success('Company created successfully');
      form.resetFields();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error('Failed to create company:', error);
      message.error(
        error?.data?.message || 'Failed to create company. Please try again.'
      );
    }
  };

  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={handleSubmit}
      initialValues={{
        foundedDate: moment(),
      }}
    >
      <Form.Item
        name='companyName'
        label='Company Name'
        rules={[{ required: true, message: 'Please enter company name' }]}
      >
        <Input placeholder='Enter company name' />
      </Form.Item>

      <Form.Item
        name='companyDescription'
        label='Description'
        rules={[
          { required: true, message: 'Please enter company description' },
        ]}
      >
        <Input.TextArea rows={4} placeholder='Enter company description' />
      </Form.Item>

      <Form.Item
        name='taxId'
        label='Tax ID'
        rules={[{ required: true, message: 'Please enter tax ID' }]}
      >
        <Input placeholder='Enter tax ID' />
      </Form.Item>

      <Form.Item
        name='industry'
        label='Industry'
        rules={[{ required: true, message: 'Please enter industry' }]}
      >
        <Input placeholder='Enter industry' />
      </Form.Item>

      <Form.Item
        name='website'
        label='Website'
        rules={[
          { required: true, message: 'Please enter website' },
          { type: 'url', message: 'Please enter a valid URL' },
        ]}
      >
        <Input placeholder='https://example.com' />
      </Form.Item>

      <Form.Item
        name='foundedDate'
        label='Founded Date'
        rules={[{ required: true, message: 'Please select founded date' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name='managerName'
        label='Manager Name'
        rules={[{ required: true, message: 'Please enter manager name' }]}
      >
        <Input placeholder='Enter manager name' />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' loading={isLoading} block>
          Create Company
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CompanyCreateForm;
