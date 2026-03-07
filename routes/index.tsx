import { createRoute, useNavigate } from '@tanstack/react-router';
import { Route as rootRoute } from './__root';
import LandingPage from '../components/LandingPage';

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  return <LandingPage onGetStarted={() => navigate({ to: '/setup' })} />;
}
