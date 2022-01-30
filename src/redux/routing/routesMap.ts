import { RoutesMap } from 'redux-first-router';

export const Routes = {
  LOGIN: '@route/LOGIN',
  HOME: '@route/HOME',
} as const;

export const routesMap: RoutesMap = {
  [Routes.LOGIN]: {
    path: '/login',
  },
  [Routes.HOME]: {
    path: '/',
  },
};
