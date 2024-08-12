// utils/paginate.js

export const getTotalPages = (totalUsers, usersPerPage) => {
    return Math.ceil(totalUsers / usersPerPage);
  };
  