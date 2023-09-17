import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom"
import HomePage from "../pages/home"
import ErrorPage from "../pages/errors/404.page"
import CategoryDetail from "../pages/category/detail.page"
import HomePageLayout from "../pages/layouts/home.layout"
import AdminLayout from "../pages/layouts/admin.layout"
import AdminDashboard from "../pages/admin/dashboard.page"
import LoginPage from "../pages/auth/login.page"
import RegisterPage from "../pages/auth/register.page"
import CheckPermission from "./rbac.config"
import { ToastContainer } from "react-toastify"
import ActivateUser from "../pages/auth/activate-user.page"
import "react-toastify/dist/ReactToastify.css"
import ForgetPage from "../pages/auth/forget-password.page"
import ResetPage from "../pages/auth/reset-password.page"

import Banner from "../pages/admin/banner"
import Brand from "../pages/admin/brand"
import Category from "../pages/admin/category"
import User from "../pages/admin/user"
import Product from "../pages/admin/product"

import { Provider, useDispatch } from "react-redux"

import { useEffect } from "react"
import { getLoggedInUser } from "../reducer/user.reducer"
import BrandDetail from "../pages/brand/detail.page"
import ProductDetail from "../pages/product"
import AboutUs from "../pages/home/component/about-us.page"
import { setItemInTheCart } from "../reducer/product.reducer"
import CartDetail from "../pages/home/cart-detail.page"
import OrderComplete from "../pages/home/order-complete"
import OrderList from "../pages/admin/cart/order-list.page"


const Routing = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLoggedInUser());
        dispatch(setItemInTheCart());

    }, [])
    return (<>

        <ToastContainer />
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<HomePageLayout />}>
                    <Route index element={<HomePage />} />

                    <Route path="about-us" element={<AboutUs />}></Route>

                    <Route path="category/:slug" element={<CategoryDetail />} />
                    <Route path="category/:slug/:childSlug" element={<CategoryDetail />} />

                    <Route path="brand/:slug" element={<BrandDetail/>} />
                    <Route path="brand/:slug/:childSlug" element={<BrandDetail />} />

                    <Route path="product/:slug" element={<ProductDetail/>} />

                    <Route path="cart" element={<CartDetail />} ></Route>
                
                    <Route path="order" element={<OrderComplete />} ></Route>
                    
                    <Route path="*" element={<ErrorPage />}></Route>
                    <Route path="/activate/:token" element={<ActivateUser />} />
                </Route>

                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<RegisterPage />} />
                <Route path="/forget-password" element={<ForgetPage />} />
                <Route path="/reset-password/:token" element={<ResetPage />} />

                <Route path="/admin" element={<CheckPermission accessBy={"admin"} Component={<AdminLayout />} />}>
                    <Route index element={<AdminDashboard />} />

                    <Route path="banner" element={<><Outlet /></>}>
                        <Route index element={<Banner.BannerListPage />} />
                        <Route path="create" element={<Banner.BannerCreateForm />} />
                        <Route path=":id" element={<Banner.BannerEditForm />} />
                    </Route>

                    <Route path="brand" element={<><Outlet /></>}>
                        <Route index element={<Brand.BrandListPage />} />
                        <Route path="create" element={<Brand.BrandCreateForm />} />
                        <Route path=":id" element={<Brand.BrandEditForm />} />
                    </Route>

                    <Route path="category" element={<><Outlet /></>}>
                        <Route index element={<Category.CategoryListPage/>} />
                        <Route path="create" element={<Category.CategoryCreateForm />} />
                        <Route path=":id" element={<Category.CategoryEditForm />} />
                    </Route>

                    <Route path="user" element={<><Outlet /></>}>
                        <Route index element={<User.UserListPage/>} />
                        <Route path="create" element={<User.UserCreateForm />} />
                        <Route path=":id" element={<User.UserEditForm />} />
                    </Route>

                    <Route path="product" element={<><Outlet /></>}>
                        <Route index element={<Product.ProductListPage/>} />
                        <Route path="create" element={<Product.ProductCreateForm />} />
                        <Route path=":id" element={<Product.ProductEditForm />} />
                    </Route>

                    <Route path="order-list" element={<OrderList/>}></Route>


                </Route>

                <Route path="/seller" element={<CheckPermission accessBy={"seller"} Component={<>Seller Layout</>} />}>
                    {/* Sellerroute */}
                </Route>

                <Route path="/customer" element={<CheckPermission accessBy={"customer"} Component={<>Customer Layout</>} />}>
                    {/* Customerroute */}
                </Route>
            </Routes>
        </BrowserRouter>

    </>
    )
}

export default Routing