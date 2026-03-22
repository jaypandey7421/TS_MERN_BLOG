import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute.tsx";
import CreatePost from "./pages/CreatePost.tsx";
import UpdatePost from "./pages/UpdatePost.tsx";
import PostPage from "./pages/PostPage.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import Search from "./pages/Search.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="post/:postSlug" element={<PostPage />} />
        <Route path="/search" element={<Search />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}