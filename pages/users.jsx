import React, { useState } from 'react';
import { Container, Typography, List, ListItem, Box, CircularProgress } from '@mui/material';
import withAuth from '../context/WithAuth';
import { useFetchUsers } from '../hooks/useFetchUsers';
import { getTotalPages } from '../utils/paginate';
import Pagination from '../components/Pagination';

function Usuarios() {
  const [page, setPage] = useState(1);
  const usersPerPage = 2;

  const { users, totalUsers, loading } = useFetchUsers(page, usersPerPage);

  const totalPages = getTotalPages(totalUsers, usersPerPage);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Lista de usuários
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <List>
            {users.map(user => (
              <ListItem key={user.id}>
                <Typography variant="body1">
                  {user.name} - {user.email}
                </Typography>
              </ListItem>
            ))}
          </List>
          <Box display="flex" justifyContent="center" mt={2}>
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          </Box>
        </>
      )}
    </Container>
  );
}

export default withAuth(Usuarios);
