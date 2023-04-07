// import App.css
import "./App.css";
//import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
//import createBrowserRouter and RouterProvide
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Navigate } from "react-router-dom";

//import RootLayout
import RootLayout from "./Components/RootLayout";
//import ErrorPage Component
import ErrorPage from "./Components/ErrorPage/ErrorPage";
//import Home Component
// import Home from "./Components/Home/Home";
//import ContactUs Component
import ContactUs from "./Components/Contactus/ContactUs";
//import Login Component
import Login from "./Components/Login/Login";
//import Register Component
import Register from "./Components/Register/Register";
//import UsersList Component
import UsersList from "./Components/Users/SuperAdmin/UsersList";
//import GetAllProjectsGD Component
import GetAllProjectsGDO from "./Components/Users/GDO/GetAllProjects";
//import GetAllPorjectsAdmin Component
import GetAllPorjectsAdmin from "./Components/Users/Admin/GetAllProjectsAdmin";
//import AdminHomepage
import AdminHomepage from "./Components/Users/Admin/AdminHome";
import AddProjects from "./Components/Users/Admin/AddProjects";
import ProjectDetailedViewAdmin from "./Components/Users/Admin/ProjectDetailedViewAdmin";
import GetAllProjectsAdmin from "./Components/Users/Admin/GetAllProjectsAdmin";
import SuperAdminHomepage from "./Components/Users/SuperAdmin/SuperAdminHomepage";
import NewUsers from "./Components/Users/SuperAdmin/NewUsers";
import GdoHomepage from "./Components/Users/GDO/GdoHomepage";
import AddProjectsGDO from "./Components/Users/GDO/AddProjectsGDO";
import GetAllProjectsProjectManager from "./Components/Users/ProjectManager/GetAllProjectsProjectManager";
import ProjectManagerHomepage from "./Components/Users/ProjectManager/ProjectManagerHomepage";
import ProjectDetailedViewPM from "./Components/Users/ProjectManager/ProjectDetailedViewPM";
import ProjectDetailedViewGDO from "./Components/Users/GDO/ProjectDetailedViewGDO";
import ModifyProject from "./Components/Users/GDO/ModifyProject";
import ResolveConcern from "./Components/Users/GDO/ResolveConcern";
import AddResourcesRequests from "./Components/Users/GDO/AddResourceRequest";

function App() {
  //create BrowserRouterObj
  const browserRouterObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "contact-us",
          element: <ContactUs />,
        },
        {
          path: "",
          element: <Navigate to="login" replace={true} />,
        },
      ],
    },
    {
      path: "gdo",
      element: <GdoHomepage />,
      children: [
        {
          path: "",
          element: <GetAllProjectsGDO />,
        },
        {
          path: "get-all-projects-gdo",
          element: <GetAllProjectsGDO />,
        },
        {
          path: "add-project-gdo",
          element: <AddProjectsGDO />,
        },
        {
          path: "get-projectDetails-Byid/:project_id",
          element: <ProjectDetailedViewGDO />,
        },
        {
          path: "resolve-concern/:project_id",
          element: <ResolveConcern />,
        },
        {
          path: "resource-request/:project_id",
          element: <AddResourcesRequests />,
        },
      ],
    },

    {
      path: "super-admin",
      element: <SuperAdminHomepage />,
      children: [
        {
          path: "users-list",
          element: <UsersList />,
        },
        {
          path: "",
          element: <UsersList />,
        },
        {
          path: "new-users",
          element: <NewUsers />,
        },
      ],
    },

    {
      path: "admin",
      element: <AdminHomepage />,
      children: [
        {
          path: "get-all-projects-admin",
          element: <GetAllPorjectsAdmin />,
        },
        {
          path: "",
          element: <GetAllProjectsAdmin />,
        },
        {
          path: "add-project",
          element: <AddProjects />,
        },
        {
          path: "project/:project_id",
          element: <ProjectDetailedViewAdmin />,
        },
        {
          path: "get-projectDetails-Byid/:project_id",
          element: <ProjectDetailedViewAdmin />,
        },
        {
          path: "modify-project/:project_id",
          element: <ModifyProject />,
        },
      ],
    },
    {
      path: "project-manager",
      element: <ProjectManagerHomepage />,
      children: [
        {
          path: "get-all-projects-project-manager",
          element: <GetAllProjectsProjectManager />,
        },
        {
          path: "",
          element: <GetAllProjectsProjectManager />,
        },
        // {
        //   path: "add-concern",
        //   element: <AddConcern />,
        // },
        {
          path: "get-projectDetails-Byid/:project_id",
          element: <ProjectDetailedViewPM />,
        },
      ],
    },
  ]);
  return (
    <div>
      {/* Provide to App  */}
      <RouterProvider router={browserRouterObj} />
    </div>
  );
}

export default App;
