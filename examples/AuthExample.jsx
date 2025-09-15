// Ejemplo de uso del nuevo sistema de autenticación con Redux

import { useAuth } from '@/hooks/useAuth';

const ExampleComponent = () => {
  const { 
    user, 
    isAuthenticated, 
    loading, 
    error, 
    logout, 
    refetchUser 
  } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!isAuthenticated) {
    return (
      <div>
        <p>No estás autenticado</p>
        <button onClick={() => window.location.href = '/login'}>
          Iniciar Sesión
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Bienvenido, {user.name}!</h1>
      <p>Email: {user.email}</p>
      <p>ID: {user.id}</p>
      
      <button onClick={logout}>
        Cerrar Sesión
      </button>
      
      <button onClick={refetchUser}>
        Refrescar Usuario
      </button>
    </div>
  );
};

export default ExampleComponent;