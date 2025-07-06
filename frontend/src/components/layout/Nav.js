import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function Nav({ setPage }) {
  return (
    <Stack direction="row" spacing={2} sx={{ m: 2 }}>
      <Button variant="contained" onClick={() => setPage('participante')}>Participante</Button>
      <Button variant="contained" onClick={() => setPage('instituicao')}>Instituição</Button>
      <Button variant="contained" onClick={() => setPage('projeto')}>Projeto</Button>
      <Button variant="contained" onClick={() => setPage('login')}>Login</Button>
      <Button variant="contained" onClick={() => setPage('admin')}>Admin</Button>
    </Stack>
  );
}

export default Nav;
