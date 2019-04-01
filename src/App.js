import React from 'react';
import { Admin, Resource } from 'react-admin';
import { EC2InstanceList } from './ec2Instances';
import authProvider from './authProvider';

const dataProvider = jsonServerProvider('http://jsonplaceholder.typicode.com');
const App = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name="ec2-instances" list={EC2InstanceList} />
  </Admin>
);

export default App;
