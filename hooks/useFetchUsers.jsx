import React, { useState, useEffect, useRef, useCallback } from 'react';

export const useFetchUsers = (page, usersPerPage, cacheSize = 5) => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(false);

  const usersCache = useRef(new Map());

  const fetchUsers = useCallback(async () => {
    if (usersCache.current.has(page)) {
      setUsers(usersCache.current.get(page));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${usersPerPage}`);
      const data = await res.json();
      
      usersCache.current.set(page, data);
      setUsers(data);

      if (usersCache.current.size > cacheSize) {
        // Remove a primeira entrada no cache (FIFO)
        const firstKey = usersCache.current.keys().next().value;
        usersCache.current.delete(firstKey);
      }

      if (page === 1) {
        const total = res.headers.get('x-total-count');
        setTotalUsers(total);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  }, [page, usersPerPage, cacheSize]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, totalUsers, loading };
};
