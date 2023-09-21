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

        http.post('cms/brands', form)
            .then(() => navigate('/brands'))
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
                    <h1>Add Brands</h1>
                </Col>
            </Row>
            <Row>
                <Col sm={6} className="mx-auto">
                <Form onSubmit={handleSubmit}>
                    <FormItem title="Name" label="Name">
                        <Form.Control type="text" name="name" id="name" defaultValue={form.name} onChange={ev => setInForm (ev, form, setForm)} />
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