import React from 'react';
import { Admin, Resource } from 'react-admin';
import { EC2InstanceList } from './ec2Instances';
import authProvider from './authProvider';
import dataProvider from './dataProvider';

const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="ec2-instances" list={EC2InstanceList} />
  </Admin>
);

export default App;
