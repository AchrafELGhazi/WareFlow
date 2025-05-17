import React from 'react';
import AuthLayout from '../../Layout/AuthLayout';
import SignInForm from '../components/SignInForm';

const SignInPage: React.FC = () => {
  return (
    <AuthLayout
      title='Sign in to your account'
      linkText='sign up for a new account'
      linkUrl='/auth/signup'
    >
      <SignInForm />
    </AuthLayout>
  );
};

export default SignInPage;
