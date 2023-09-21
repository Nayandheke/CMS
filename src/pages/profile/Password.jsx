import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FormItem, SubmitBtn } from "../../components";
import { setInForm } from "../../lib";
import http from "../../http";

export const Password = () => {

    const user = useSelector(state => state.user.value)

    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)

    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.patch('profile/password', form)
            .then(() => http.get('profile/details'))
            .then(({data}) => {
                
            })
            .catch(err => {})
            .finally(() => setLoading(false))
    }

    return (
        <Col xs={12} className="bg-white my-3 py-3 rounded-3 shadow-sm">
            <Row>
                <Col sm={6} className="mx-auto">
                    <h1>Change Password</h1>
                </Col>
            </Row>
            <Row>
                <Col sm={6} className="mx-auto">
                <Form onSubmit={handleSubmit}>
                    <FormItem title="Old Password" label="old Password">
                        <Form.Control type="password" name="oldPassword" id="oldPassword" onChange={ev => setInForm (ev, form, setForm)} />
                    </FormItem>

                    <FormItem title="New Password" label="New Password">
                        <Form.Control type="password" name="newPassword" id="newPassword" onChange={ev => setInForm (ev, form, setForm)} />
                    </FormItem>

                    <FormItem title="Confirm Password" label="Confirm Password">
                        <Form.Control type="password" name="confirmPassword" id="confirmPassword" onChange={ev => setInForm (ev, form, setForm)} />
                    </FormItem>

                    <div className="mb-3">
                        <SubmitBtn loading={loading}/>

                    </div>
                </Form>
                </Col>
            </Row>
        </Col>
    );
};