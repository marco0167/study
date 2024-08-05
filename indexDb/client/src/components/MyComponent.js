import React, { useEffect } from 'react';

const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('myDB', 1);
    request.onerror = () => reject('Error opening database');
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains('users')) {
        db.createObjectStore('users', { keyPath: 'id' });
      }
    };
  });
};

const MyComponent = () => {
  useEffect(() => {
    initDB().then(db => {
      // Use the database
    }).catch(error => {
      console.error(error);
    });
  }, []);

  return <div>My Component</div>;
};

export default MyComponent;
