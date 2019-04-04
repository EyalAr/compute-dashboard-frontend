import React from 'react';
import { List, Datagrid, TextField, EmailField } from 'react-admin';

export const EC2InstanceList = props => (
    <List {...props} bulkActionButtons={false}>
        <Datagrid>
            <TextField source="name" />
            <TextField source="id" />
            <TextField source="type" />
            <TextField source="state" />
            <TextField source="az" />
            <TextField source="public_ip" />
            <TextField source="private_ip" />/>
        </Datagrid>
    </List>
);
