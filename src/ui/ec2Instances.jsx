import React from 'react';
import {
  List, Datagrid, TextField,
} from 'react-admin';

export default props => (
  <List {...props} bulkActionButtons={false} title="EC2 Instances">
    <Datagrid>
      <TextField source="name" />
      <TextField source="id" />
      <TextField source="type" />
      <TextField source="state" />
      <TextField source="az" />
      <TextField source="public_ip" />
      <TextField source="private_ip" />
    </Datagrid>
  </List>
);
