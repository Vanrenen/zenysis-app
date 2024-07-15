import React from 'react';
import {
  Container,
  Button,
  Box,
  Grid,
} from '@mui/material';

interface ListItemType {
  code: React.Key | null | undefined;
  category: string;
  name: string;
}

const ListComponent: React.FC<any> = ({ listItems, onDelete, onEdit }) => (
  <Container>
    <Grid container spacing={2}>
      {listItems.map((listItem: ListItemType) => (
        <Grid
          item xs={5}
          key={listItem.code}
          sx={{
            padding: '10px',
            boxShadow: '5px 10px #888888',
            border: '1px solid',
            margin: '10px',
            }}>
        <Container>
          {listItem.category ? 
            <Container>
              <Box>{`${listItem.name} - ${listItem.code}`}</Box>
              <Box>{listItem.category}</Box>
            </Container> : 
            <Container>{`${listItem.name} - ${listItem.code}`}</Container>
          }
          <Box sx={{paddingTop: '25px'}}>
            <Button variant={'outlined'} onClick={() => onEdit(listItem.code)} sx={{float: 'left'}}>Edit</Button>
            <Button variant={'outlined'} onClick={() => onDelete(listItem.code)} sx={{float: 'right'}}>Delete</Button>
          </Box>
        </Container>
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default ListComponent;
