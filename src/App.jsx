import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useRouteError,
} from "react-router-dom";
import Home from "./components/Home";
import Generate from "./components/Generate";
import Profile from "./components/Profile";
import NotesLinkProvider from "./components/Context/NotesLinkProvider";
import FileLinkProvider from "./components/Context/FileLinkProvider";
import AuthCallback from "./components/AuthCallback";

const ErrorBoundary = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <h1>Oops! Something went wrong</h1>
      <p>An unexpected error occurred.</p>
      {error.statusText && <p>{error.statusText}</p>}
      {error.message && <p>{error.message}</p>}
      <button
        onClick={() => (window.location.href = "/")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Return Home
      </button>
    </div>
  );
};

const RootLayout = () => {
  return (
    <NotesLinkProvider>
      <FileLinkProvider>
        <Outlet />
      </FileLinkProvider>
    </NotesLinkProvider>
  );
};

const RequireAuth = () => {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    return <Navigate to="/" replace={{ state: { from: "/index.html" } }} />;
  }

  return <Outlet />;
};

function App() {
  console.log("app.jsx");
  const router = createBrowserRouter([
    {
      element: <RootLayout />, // Root element with providers
      errorElement: <ErrorBoundary />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "/index.html",
          element: <Generate />,
        },
        {
          path: "/generate",
          element: (
            <RequireAuth>
              <Generate />
            </RequireAuth>
          ),
        },
        ,
        { path: "/profile", element: <Profile /> },
        { path: "/auth/callback/google", element: <AuthCallback /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
