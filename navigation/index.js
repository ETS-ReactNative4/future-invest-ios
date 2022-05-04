import React from 'react';
import { AuthProvider } from './AuthProvider';
import Routes from './Routes';

const Providers = () => {
  console.log("Providers")
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default Providers;