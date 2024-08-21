import { Routes, Route, Navigate } from "react-router-dom";
import { NotasAppPage } from '../pages/NotasAppPage';

export const NotasAppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<NotasAppPage/>} />

            <Route path="/*" element={ <Navigate to="/" /> } />
        </Routes>
    )
}