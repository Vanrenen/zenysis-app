import React from 'react';
import {
  Container,
  Box,
  Input,
  Button,
  InputLabel,
} from '@mui/material';

interface Props {
  onDelete: (code: string) => void;
  errorMessage: string;
  inputLabel: string;
  buttonText: string;
}

const DeleteForm: React.FC<Props> = ({ onDelete, errorMessage, inputLabel, buttonText }) => {
  const [id, setId] = React.useState<string>();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (id) {
      onDelete(id);
      setId(id);
    } else {
      alert(errorMessage);
    }
  };

  return (
    <Container sx={{marginBottom: '25px'}}>
      <form onSubmit={handleSubmit}>
        <Box>
          <InputLabel>
            {inputLabel}
            <Input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </InputLabel>
        </Box>
        <Button type="submit" variant={'outlined'} sx={{marginTop: '25px'}}>{buttonText}</Button>
      </form>
    </Container>
  );
};

export default DeleteForm;