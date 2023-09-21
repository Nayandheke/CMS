import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { FormItem, Loading, SubmitBtn } from "../../components";
import { setInForm } from "../../lib";
import http from "../../http";
import Switch from "react-switch"
import { useNavigate, useParams } from "react-router-dom";

export const Edit = () => {
    const [form, setForm] = useState({})
    const [order, setOrders] = useState({})
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(false)

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        setLoadingPage(true)
        http.get(`cms/orders/${params.id}`)
            .then(({data}) => setOrders(data))
            .catch(err => {})
            .finally(() => setLoadingPage(false))
    }, [params.is])

    useEffect(() => {
        if(Object.keys(order).length){
            setForm({
                name: order.name
            })
        }
    }, [order])
    
    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.patch(`cms/orders/${params.id}`, form)
            .then(() => navigate('/orders'))
            .catch(err => {})
            .finally(() => setLoading(false))
    }

    return (
        <Col xs={12} className="bg-white my-3 py-3 rounded-3 shadow-sm">
            <Row>
                <Col sm={6} className="mx-auto">
                    <h1>Edit categorie</h1>
                </Col>
            </Row>
            <Row>
                <Col sm={6} className="mx-auto">
                {loadingPage ? <Loading/> : <Form onSubmit={handleSubmit}>
                   
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