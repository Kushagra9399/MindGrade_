import { createRouter } from '@tanstack/react-router';
import { Route as rootRoute } from './routes/__root';
import { indexRoute } from './routes/index';
import { setupRoute } from './routes/setup';
import { quizRoute } from './routes/quiz';
import { resultsRoute } from './routes/results';
import { generatingRoute, submittingRoute, errorRoute } from './routes/status';

const routeTree = rootRoute.addChildren([
  indexRoute,
  setupRoute,
  quizRoute,
  resultsRoute,
  generatingRoute,
  submittingRoute,
  errorRoute,
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
