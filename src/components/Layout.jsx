import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "react-toastify/dist/ReactToastify.min.css"
import "react-confirm-alert/src/react-confirm-alert.css"
import "./Layout.css"
import { Container, Row } from "react-bootstrap"
import { Outlet } from "react-router-dom"
import {CmsNav} from "./CmsNav"

export const Layout = () =>{
    return<>
    <CmsNav/>
    <Container>
        <Row>
            <Outlet/>
        </Row>
    </Container>
    </>
}