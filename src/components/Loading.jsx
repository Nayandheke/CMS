import { Col, Row } from "react-bootstrap";

export const Loading = () => {
    return (
        <Row>
            <Col>
                <h5 className="text-center">
                    <i className="fa-solid fa-spinner fa-spin me-2"></i>
                    Loading ....
                </h5>
            </Col>
        </Row>
    );
};