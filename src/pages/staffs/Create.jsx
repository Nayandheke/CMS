import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { FormItem, SubmitBtn } from "../../components";
import { setInForm } from "../../lib";
import http from "../../http";
import { setUser } from "../../store";
import Switch from "react-switch"
import {  useNavigate } from "react-router-dom";

export const Create = () => {
    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    
    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.post('cms/staffs', form)
            .then(() => navigate('/staffs'))
            .then(({data}) => {
                dispatch(setUser(data))
            })
            .catch(err => {})
            .finally(() => setLoading(false))
    }

    return (
        <Col xs={12} className="bg-white my-3 py-3 rounded-3 shadow-sm">
            <Row>
                <Col sm={6} className="mx-auto">
                    <h1>Add Staff</h1>
                </Col>
            </Row>
            <Row>
                <Col sm={6} className="mx-auto">
                <Form onSubmit={handleSubmit}>
                    <FormItem title="Name" label="Name">
                        <Form.Control type="text" name="name" id="name" defaultValue={form.name} onChange={ev => setInForm (ev, form, setForm)} />
                    </FormItem>

                    <FormItem title="Email" label="email">
                        <Form.Control type="email" name="email" id="email" defaultValue={form.email} onChange={ev => setInForm (ev, form, setForm)} />
                    </FormItem>

                    <FormItem title="New Password" label="password">
                        <Form.Control type="password" name="password" id="password" onChange={ev => setInForm (ev, form, setForm)} />
                    </FormItem>

                    <FormItem title="Confirm Password" label="confirm_password">
                        <Form.Control type="password" name="confirm_password" id="confirm_password" onChange={ev => setInForm (ev, form, setForm)} />
                    </FormItem>


                    <FormItem title="Phone" label="Phone">
                        <Form.Control type="text" name="phone" id="phone" defaultValue={form.phone} onChange={ev => setInForm (ev, form, setForm)} />
                    </FormItem>

                    <FormItem title="Address" label="Address">
                        <Form.Control as="textarea" name="address" id="address" defaultValue={form.address} onChange={ev => setInForm (ev, form, setForm)} />
                    </FormItem>
                    <FormItem title="Status" label="status">
                        <br></br>
                        <Switch checked={form.status} onChange={() => setForm ({
                            ...form,
                            status: !form.status,
                            })}/>
                    </FormItem>
                    <div className="mb-3">
                        <SubmitBtn loading={loading}/>

                    </div>
                </Form>
                </Col>
            </Row>
        </Col>
    );
}