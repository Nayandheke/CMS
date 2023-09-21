import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { FormItem, Loading, SubmitBtn } from "../../components";
import { setInForm } from "../../lib";
import http from "../../http";
import Switch from "react-switch"
import { useNavigate, useParams } from "react-router-dom";

export const Edit = () => {
    const [form, setForm] = useState({})
    const [categorie, setCategories] = useState({})
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(false)

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        setLoadingPage(true)
        http.get(`cms/categories/${params.id}`)
            .then(({data}) => setCategories(data))
            .catch(err => {})
            .finally(() => setLoadingPage(false))
    }, [params.is])

    useEffect(() => {
        if(Object.keys(categorie).length){
            setForm({
                name: categorie.name
            })
        }
    }, [categorie])
    
    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        http.patch(`cms/categories/${params.id}`, form)
            .then(() => navigate('/categories'))
            .catch(err => {})
            .finally(() => setLoading(false))
    }

    return (
        <Col xs={12} className="bg-white my-3 py-3 rounded-3 shadow-sm">
            <Row>
                <Col sm={6} className="mx-auto">
                    <h1>Edit Categories</h1>
                </Col>
            </Row>
            <Row>
                <Col sm={6} className="mx-auto">
                {loadingPage ? <Loading/> : <Form onSubmit={handleSubmit}>
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
                </Form>}
                </Col>
            </Row>
        </Col>
    );
}