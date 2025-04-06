import { useRoutes } from 'react-router-dom';
import { getRoutes } from './Routes';
import { useEffect } from 'react';
import { userStore } from './store/user-store';
import loaderStore from './store/loader-store';
import { ToastProvider } from './UI/components/Toast/ToastProvider';
import { ToastContainer } from './UI/components/Toast/ToastContainer/ToastContainer';

function App() {
  const accessToken = localStorage.getItem('accessToken');
  const routes = useRoutes(getRoutes(Boolean(accessToken)));

  const getUser = async () => {
    if (!accessToken) return;

    try {
      loaderStore.setIsLoading();
      await userStore.fetchUser();
    } finally {
      loaderStore.closeLoader();
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <ToastProvider>
      {routes}
      <ToastContainer />
    </ToastProvider>
  );
}

export default App;
