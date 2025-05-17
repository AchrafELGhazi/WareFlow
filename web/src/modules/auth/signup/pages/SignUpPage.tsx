import React from 'react';
import AuthLayout from '../../Layout/AuthLayout';
import SignUpForm from '../components/SignUpForm';

const SignUpPage: React.FC = () => {
  return (
    <AuthLayout
      title='Create a new account'
      linkText='Sign in here'
      linkUrl='/auth/signin'
    >
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUpPage;
