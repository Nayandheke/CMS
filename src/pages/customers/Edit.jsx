import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { FormItem, Loading, SubmitBtn } from "../../components";
import { setInForm } from "../../lib";
import http from "../../http";
import Switch from "react-switch"
import { useNavigate, useParams } from "react-router-dom";

export const Edit = () => {
    const [form, setForm] = useState({})
    const [customer, setCustomer] = useState({})
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(false)

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        setLoadingPage(true)
        http.get(`cms/customers/${params.id}`)
            .then(({data}) => setCustomer(data))
            .catch(err => {})
            .finally(() => setLoadingPage(false))
    }, [params.is])

    useEffect(() => {
        if(Object.keys(customer).length){
            setForm({
                name: customer.name,
                phone: customer.phone,
                address: customer.address,
                status: customer.status,
            })
        }
    }, [customer])
    
    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.patch(`cms/customers/${params.id}`, form)
            .then(() => navigate('/customers'))
            .catch(err => {})
            .finally(() => setLoading(false))
    }

    return (
        <Col xs={12} className="bg-white my-3 py-3 rounded-3 shadow-sm">
            <Row>
                <Col sm={6} className="mx-auto">
                    <h1>Edit Customer</h1>
                </Col>
            </Row>
            <Row>
                <Col sm={6} className="mx-auto">
                {loadingPage ? <Loading/> : <Form onSubmit={handleSubmit}>
                    <FormItem title="Name" label="Name">
                        <Form.Control type="text" name="name" id="name" defaultValue={form.name} onChange={ev => setInForm (ev, form, setForm)} />
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
                </Form>}
                </Col>
            </Row>
        </Col>
    );
}