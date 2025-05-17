import React from 'react';
import AuthLayout from '../../../../shared/Layout/AuthLayout';
import SignUpForm from '../components/SignUpForm';

const SignUpPage: React.FC = () => {
  return (
    <AuthLayout
      title='Create a new account'
      subtitle='Already have an account?'
      linkText='Sign in here'
      linkUrl='/auth/signin'
    >
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUpPage;
