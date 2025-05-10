import {
  Routes,
  BrowserRouter as Router,
  Route,
  Navigate,
} from 'react-router-dom';
import Navbar from './layout/Navbar';
import { Suspense } from 'react';
import { routes } from './routes';

function App() {
  const isAuthenticated = false;

  return (
    <>
      <Router>
        <Navbar />
        <Suspense fallback={<h2>Loading...</h2>}>
          <Routes>
            {routes.map(({ path, element, protected: isProtected }) => (
              <Route
                key={path}
                path={path}
                element={
                  isProtected && !isAuthenticated ? (
                    <Navigate to='/' />
                  ) : (
                    element
                  )
                }
              />
            ))}
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
