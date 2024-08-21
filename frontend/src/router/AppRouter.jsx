import { Route, Routes } from "react-router-dom";

import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { NotasAppRoutes }  from '../NotasApp/routes/NotasAppRoutes';

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/auth/*" element={ <AuthRoutes /> } />
            <Route path="/*" element={ <NotasAppRoutes /> }  />
        </Routes>
    )
}