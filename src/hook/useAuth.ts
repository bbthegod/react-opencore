import { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

export function decrypt() {
  const hash = localStorage.getItem('auth');
  if (hash) {
    const data = CryptoJS.TripleDES.decrypt(hash, process.env.REACT_APP_SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return JSON.parse(data);
  } else {
    localStorage.clear();
  }
  return null;
}

export function useAuth() {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = decrypt();
    if (data) {
      setAuth(JSON.parse(data));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const setDataToStore = useCallback((data: AuthStorage) => {
    try {
      const auth = CryptoJS.TripleDES.encrypt(JSON.stringify(data), process.env.REACT_APP_SECRET_KEY).toString();
      if (auth) {
        localStorage.setItem('auth', auth);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  return [auth, setDataToStore];
}
