import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout, Login } from './components/index.js'
import UpdateProperty from './pages/admin/updateProperty.jsx'

// import AddPost from "./pages/AddPost";
import Signup from './pages/Signup'
// import EditPost from "./pages/EditPost";

// import Post from "./pages/Post";

// import AllPosts from "./pages/AllPosts";
import AddProperty from './pages/admin/AddProperty.jsx'
import AdminRoute from "./components/AdminRoute";
import Cart from './pages/Cart.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        
        
        
     {
  path: "/add-property",
  element: (
    <AuthLayout authentication adminOnly>
      <AdminRoute>
        <AddProperty />
      </AdminRoute>
    </AuthLayout>
  )
},
{
  path: "/update-property/:id",
  element: (
    <AuthLayout authentication adminOnly>
      <AdminRoute>
        <UpdateProperty />
      </AdminRoute>
    </AuthLayout>
  )
},

{
            path: "/bookings/my",
            element: (
                <AuthLayout authentication>
                    <Cart />
                </AuthLayout>
            ),
        },


    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
//    </React.StrictMode>,
)
