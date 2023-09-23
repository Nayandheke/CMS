import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom"
import { Layout } from "../components/Layout"
import * as Pages from "../pages"
import { PrivateRoutes } from "./PrivateRoutes"
import { AdminRoutes } from "./AdminRoutes"

export const CmsRoutes = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<PrivateRoutes element = {<Pages.Dashboard/>} />}/>

                <Route path="edit-profile" element={<PrivateRoutes element = {<Pages.Profile.Edit/>} />}/>

                <Route path="changepassword" element={<PrivateRoutes element = {<Pages.Profile.Password/>} />}/>

                <Route path="login" element={<Pages.Login/>}/>

                <Route path="staffs" element={<PrivateRoutes element={<AdminRoutes element={<Outlet/>}/>} />}>
                    <Route index element={<Pages.Staffs.List/>} />
                    <Route path="create" element={<Pages.Staffs.Create />} />
                    <Route path="edit/:id" element={<Pages.Staffs.Edit />} />
                </Route>

                <Route path="customers" element={<PrivateRoutes  element={<Outlet/>} />}>
                    <Route index element={<Pages.Customers.List/>} />
                    <Route path="create" element={<Pages.Customers.Create />} />
                    <Route path="edit/:id" element={<Pages.Customers.Edit />} />
                </Route>

                <Route path="categories" element={<PrivateRoutes  element={<Outlet/>} />}>
                    <Route index element={<Pages.Categories.List/>} />
                    <Route path="create" element={<Pages.Categories.Create />} />
                    <Route path="edit/:id" element={<Pages.Categories.Edit />} />
                </Route>

                <Route path="brands" element={<PrivateRoutes  element={<Outlet/>} />}>
                    <Route index element={<Pages.Brands.List/>} />
                    <Route path="create" element={<Pages.Brands.Create />} />
                    <Route path="edit/:id" element={<Pages.Brands.Edit />} />
                </Route>

                <Route path="products" element={<PrivateRoutes  element={<Outlet/>} />}>
                    <Route index element={<Pages.Products.List/>} />
                    <Route path="create" element={<Pages.Products.Create />} />
                    <Route path="edit/:id" element={<Pages.Products.Edit />} />
                </Route>

                <Route path="reviews" element={<PrivateRoutes  element={<Pages.Reviews.List/>} />}/>

                <Route path="orders" element={<PrivateRoutes  element={<Pages.Orders.List/>} />}/>
                

                

            </Route>
        </Routes>
    </BrowserRouter>
}