import { Nav, Navbar, Container, NavDropdown, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { clearStorage } from "../lib"
import { clearUser } from "../store"

export const CmsNav = () => {
    const user = useSelector(state => state.user.value)

    const dispatch = useDispatch()

    const handleLogout = () =>{
        clearStorage('130cmstoken')
        dispatch(clearUser())
    }

    return Object.keys(user).length ? <Navbar variant="dark" bg="dark" expand="lg">
    <Container>

    <Link to="/" className="navbar-brand">E-commerce 
    </Link>

    <Navbar.Toggle/>
    <Navbar.Collapse>


    <Nav className="me-auto">
        {user.type == 'Admin' ? <Nav.Item>
            <NavLink to="/staffs" className="nav-link">
                <i className="fa-solid fa-users me-2"></i>Staffs
            </NavLink>
        </Nav.Item> : null}
        <Nav.Item>
            <NavLink to="/customers" className="nav-link">
                <i className="fa-solid fa-user me-2"></i>Customers
            </NavLink>
        </Nav.Item> 
        <Nav.Item>
            <NavLink to="/categories" className="nav-link">
                <i className="fa-solid fa-th-large me-2"></i>Categories
            </NavLink>
        </Nav.Item> 
        <Nav.Item>
            <NavLink to="/brands" className="nav-link">
                <i className="fa-solid fa-earth me-2"></i>Brands
            </NavLink>
        </Nav.Item> 
        <Nav.Item>
            <NavLink to="/products" className="nav-link">
                <i className="fa-solid fa-gift me-2"></i>Products
            </NavLink>
        </Nav.Item> 
        <Nav.Item>
            <NavLink to="/reviews" className="nav-link">
                <i className="fa-solid fa-comments me-2"></i>Reviews
            </NavLink>
        </Nav.Item> 
        <Nav.Item>
            <NavLink to="/orders" className="nav-link">
                <i className="fa-solid fa-dollar me-2"></i>Orders
            </NavLink>
        </Nav.Item> 
        
    </Nav>

    <Nav className="mb-2 mb-lg-0">
        <NavDropdown title={<><i className="fa-solid fa-user me-2"></i>{user.name}</>}>
            <Link to="/edit-profile" className="dropdown-item">
                <i className="fa-solid fa-user-edit me-2">
                </i>
                    Edit profile
            </Link>
            <Link to="/changepassword" className="dropdown-item">
                <i className="fa-solid fa-asterisk me-2">
                </i>
                    ChangePassword
            </Link>
            <NavDropdown.Divider />
                <Button className="btn btn-link dropdown-item rounded-0" type="button" onClick={handleLogout}>
                <i className="fa-solid fa-sign-out-alt me-2">
                </i>
                    Logout
                </Button>

        </NavDropdown>
    </Nav>

    </Navbar.Collapse>
    </Container>
</Navbar>: null
}