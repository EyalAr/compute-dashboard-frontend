import React from 'react';
import { Admin, Resource } from 'react-admin';
import EC2InstanceList from './ec2Instances';
import authProvider from '../providers/auth';
import dataProvider from '../providers/data';

const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="ec2-instances" options={{ label: 'EC2 Instances' }} list={EC2InstanceList} />
  </Admin>
);

export default App;
