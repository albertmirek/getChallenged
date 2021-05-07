import React from 'react';
import { AuthProvider } from './AuthProvider';
import { DatabaseProvider} from './DatabaseProvider';
import Routes from './Routes';
import {ApiProvider} from './ApiProvider';

export default function Providers() {
  return (
    <AuthProvider>
      <DatabaseProvider>
        <ApiProvider>
            <Routes />
        </ApiProvider>
      </DatabaseProvider>
    </AuthProvider>
  );
}