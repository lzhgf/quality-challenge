import React from 'react';
import { render, screen } from '@testing-library/react';
import UsersPage from '../pages/users';
import { useFetchUsers } from '../hooks/useFetchUsers';

jest.mock('../hooks/useFetchUsers');
jest.mock('../context/WithAuth', () => (component) => component);

function generateRandomUsers(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
  }));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

describe('UsersPage Pagination', () => {
  it('testa diferentes cenários de paginação com quantidade randômica de usuários', () => {
    const totalUsers = getRandomInt(1, 10);
    const usersPerPage = getRandomInt(1, 5); 
    const totalPages = Math.ceil(totalUsers / usersPerPage);

    for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
      const start = (currentPage - 1) * usersPerPage;
      const end = start + usersPerPage;
      const mockData = generateRandomUsers(totalUsers).slice(start, end);

      useFetchUsers.mockReturnValueOnce({
        users: mockData,
        totalUsers,
        loading: false,
      });

      render(<UsersPage />);
      mockData.forEach((user) => {
        expect(screen.getByText(new RegExp(user.name, 'i'))).toBeInTheDocument();
      });
    }
  });
});
