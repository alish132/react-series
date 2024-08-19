import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import Protected from './components/AuthLayout.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {Home, LoginPage, SignupPage, AllPosts, AddPost, EditPost, Post} from './components/index.js'

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      }, 
      {
        path: '/login',
        element: (
          <Protected authentication={false}>
            <LoginPage />
          </Protected>
        )
      },
      {
        path: '/signup',
        element: (
          <Protected authentication={false}>
            <SignupPage />
          </Protected>
        )
      },
      {
        path: '/all-posts',
        element: (
          <Protected authentication>
            {" "}
            <AllPosts />
          </Protected>
        )
      },
      {
        path: '/add-post',
        element: (
          <Protected authentication>
            {" "}
            <AddPost />
          </Protected>
        )
      },
      {
        path: '/edit-post/:slug',
        element:(
          <Protected authentication>
            {" "}
            <EditPost />
          </Protected>
        )
      },
      {
        path:'/post/:slug',
        // element:<Post />
      element: (
        <Protected authentication>
            {" "}
            <Post />
          </Protected>
      )
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
