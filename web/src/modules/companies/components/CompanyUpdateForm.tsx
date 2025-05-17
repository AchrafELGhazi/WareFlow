import React, { useEffect } from 'react';
import { useUpdateCompanyMutation } from '../api/companyApi';
import { Form, Input, DatePicker, Button, message } from 'antd';
import moment from 'moment';
import type { Company, UpdateCompanyRequest } from '../api/companyApi';

interface CompanyFormValues {
  companyName: string;
  companyDescription: string;
  taxId: string;
  industry: string;
  website: string;
  foundedDate: moment.Moment;
  managerName: string;
}

interface CompanyUpdateFormProps {
  company: Company;
  onSuccess?: () => void;
}

const CompanyUpdateForm: React.FC<CompanyUpdateFormProps> = ({
  company,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [updateCompany, { isLoading }] = useUpdateCompanyMutation();

  useEffect(() => {
    // Set initial form values from company data
    form.setFieldsValue({
      companyName: company.company_name,
      companyDescription: company.company_description,
      taxId: company.tax_id,
      industry: company.industry,
      website: company.website,
      foundedDate: company.founded_date ? moment(company.founded_date) : null,
      managerName: company.manager_name,
    });
  }, [company, form]);

  const handleSubmit = async (values: CompanyFormValues) => {
    try {
      const formattedValues: UpdateCompanyRequest = {
        ...values,
        foundedDate: values.foundedDate
          ? values.foundedDate.format('YYYY-MM-DD')
          : undefined,
      };

      await updateCompany({
        companyId: company.company_id,
        data: formattedValues,
      }).unwrap();

      message.success('Company updated successfully');

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error('Failed to update company:', error);
      message.error(
        error?.data?.message || 'Failed to update company. Please try again.'
      );
    }
  };

  return (
    <Form form={form} layout='vertical' onFinish={handleSubmit}>
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
          Update Company
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CompanyUpdateForm;
