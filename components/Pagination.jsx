import React from 'react';
import { Button, ButtonGroup } from '@mui/material';

const Pagination = ({ totalPages, currentPage, onPageChange }) => (
  <ButtonGroup variant="outlined" color="primary" aria-label="outlined primary button group">
    {[...Array(totalPages)].map((_, index) => (
      <Button
        key={index + 1}
        onClick={() => onPageChange(index + 1)}
        variant={index + 1 === currentPage ? 'contained' : 'outlined'}
      >
        {index + 1}
      </Button>
    ))}
  </ButtonGroup>
);

export default Pagination;
