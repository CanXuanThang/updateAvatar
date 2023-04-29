import React, { lazy, Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { ROUTES } from './configs/routes';
import ProtectedRoute from './modules/common/components/ProtectedRoute';

const HomePage = lazy(() => import('./modules/home/pages/HomePage'));
const ContactPage = lazy(() => import('./modules/home/pages/ContactPage'));
const LoginPage = lazy(() => import('./modules/auth/pages/LoginPage'));
const SignUpPage = lazy(() => import('./modules/auth/pages/SignUpPage'));
const ListItemProduct = lazy(() => import('./modules/product/page/ListItemProduct'));
const ViewDetailPage = lazy(() => import('./modules/product/ListItem/ViewDetailPage'));
const UserPage = lazy(() => import('./modules/auth/pages/UserPage'));

interface Props {}

export const Routes = (props: Props) => {
  const location = useLocation();

  return (
    <Suspense fallback={<div>Loading.....</div>}>
      <Switch location={location}>
        <Route path={ROUTES.login} component={LoginPage} />
        <ProtectedRoute path={ROUTES.home} component={HomePage} />
        <Route path={ROUTES.contact} component={ContactPage} />
        <Route path={ROUTES.signUp} component={SignUpPage} />
        <Route path={ROUTES.product} component={ListItemProduct} />
        <Route path={ROUTES.detail} component={ViewDetailPage} />
        <Route path={ROUTES.profile} component={UserPage} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </Suspense>
  );
};
