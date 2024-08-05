import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { useAuth } from "../provider/AuthProvider";

import Login from '../pages/Login'
import Logout from '../pages/Logout'

export default () => {
	const { token } = useAuth();

	const routesForPublic = [
		{
			path: "/service",
			element: <div>Service Page</div>,
		},
		{
			path: "/about-us",
			element: <div>About Us</div>,
		},
	];

	const routesForAuthenticatedOnly = [
		{
			path: "/",
			element: <ProtectedRoute />,
			children: [
				{
					path: "/",
					element: <div>User Home Page</div>,
				},
				{
					path: "/profile",
					element: <div>User Profile</div>,
				},
				{
					path: "/logout",
					element: <Logout />,
				},
			],
		},
	];

	const routesForNotAuthenticatedOnly = [
		{
			path: "/",
			element: <div>Home Page</div>,
		},
		{
			path: "/login",
			element: <Login />,
		},
	];

	const router = createBrowserRouter([
		...routesForPublic,
		...ProtectedRoute(!token ? routesForNotAuthenticatedOnly : []),
		...routesForAuthenticatedOnly
	])

	return <RouterProvider router={router} />;
};
