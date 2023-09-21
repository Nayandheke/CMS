import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FormItem, Loading, SubmitBtn } from "../../components";
import { imgUrl, setInForm } from "../../lib";
import http from "../../http";
import Switch from "react-switch"
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

export const Edit = () => {
    const [product, setProduct] = useState({})
    const [form, setForm] = useState({ featured: false })
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(false)
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [selectedImgs, setSelectedImgs] = useState([])

    const navigate = useNavigate()

    const params = useParams()

    useEffect(() => {
        setLoadingPage(true)
        http.get('cms/categories')
            .then(({ data }) => {
                setCategories(data)
                return http.get('cms/brands')
            })
            .then(({ data }) => {
                setBrands(data)
                return http.get(`cms/products/${params.id}`)
                })
            .then(({data}) => setProduct(data))
            .catch(err => { })
            .finally(() => setLoadingPage(false))
    }, [])

    useEffect(() => {
        if(Object.keys(product).length){
            setForm({
                name: product.name,
                summary: product.summary,
                description: product.description,
                price: product.price,
                discounted_price: product.discounted_price,
                categoryId: product.categoryId,
                brandId: product.brandId,
                status: product.status,
                featured: product.featured

            })
        }
    }, [product])

    useEffect(() => {
        if (form.images && form.images.length) {
            let list = [];
            for (let image of form.images) {
                list.push(image)
            }

            setSelectedImgs(list)
        }
    }, [form.images])

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]


    const handleSubmit = ev => {
        ev.preventDefault()
        setLoading(true)

        let fd = new FormData

        for (let k in form) {
            if (k == 'images') {
                for (let image of form.images) {
                    fd.append('images', image)
                }
            } else {
                fd.append(k, form[k])
            }
        }

        http.patch(`cms/products/${params.id}`, fd, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(() => navigate('/products'))
            .catch(err => { })
            .finally(() => setLoading(false))
    }

    const handleDelete = filename => {
        setLoadingPage(true)

        http.delete(`cms/products/${params.id}/image/${filename}`)
            .then(() => http.get(`cms/products/${params.id}`))
            .then(({data}) => setProduct(data))
            .catch(() => {})
            .finally(() => setLoadingPage(false))

    }

    return (
        <Col xs={12} className="bg-white my-3 py-3 rounded-3 shadow-sm">
            <Row>
                <Col sm={6} className="mx-auto">
                    <h1>Edit Product</h1>
                </Col>
            </Row>
            <Row>
                <Col sm={6} className="mx-auto">
                    {loadingPage ? <Loading /> : <Form onSubmit={handleSubmit}>
                        <FormItem title="Name" label="Name">
                            <Form.Control type="text" name="name" id="name"  defaultValue={form.name} onChange={ev => setInForm(ev, form, setForm)} required />
                        </FormItem>

                        <FormItem title="Summary" label="summary">
                            <ReactQuill theme="snow" modules={modules} formats={formats} value={form.summary} onChange={value => setForm({
                                ...form,
                                summary: value
                            })}></ReactQuill>
                        </FormItem>

                        <FormItem title="Description" label="description">
                            <ReactQuill theme="snow" modules={modules} formats={formats} value={form.description} onChange={value => setForm({
                                ...form,
                                description: value
                            })}></ReactQuill>
                        </FormItem>

                        <FormItem title="Price" label="price">
                            <Form.Control type="number" name="price" id="price" defaultValue={form.price} onChange={ev => setInForm(ev, form, setForm)} required />
                        </FormItem>

                        <FormItem title="Discounted Price" label="discounted_price">
                            <Form.Control type="number" name="discounted_price" id="discounted_price" defaultValue={form.discounted_price} onChange={ev => setInForm(ev, form, setForm)} />
                        </FormItem>

                        <FormItem title="Categories" label="categoryId" >
                            <Form.Select name="categoryId" id="categoryId" value={form.categoryId} onChange={ev => setInForm(ev, form, setForm)} required>
                                <option value="">Select a Category</option>
                                {categories.map(category => <option value={category._id} key={category._id}>{category.name}</option>)}
                            </Form.Select>
                        </FormItem>

                        <FormItem title="brands" label="brandId" >
                            <Form.Select name="brandId" id="brandId" value={form.brandId} onChange={ev => setInForm(ev, form, setForm)} required>
                                <option value="">Select a Brand</option>
                                {brands.map(brands => <option value={brands._id} key={brands._id}>{brands.name}</option>)}
                            </Form.Select>
                        </FormItem>

                        <FormItem type="Images" label="images">
                            <Form.Control type="file" name="image" id="images" onChange={ev => setForm({
                                ...form,
                                images: ev.target.files,
                            })} accept="image/*" multiple />
                            
                            {selectedImgs.length ? <Row>
                                {selectedImgs.map((image, i) => <Col sm={4} className="mt-3" key={i}>
                                    <img src={URL.createObjectURL(image)} className="img-fluid" />
                                    </Col>)}
                                    </Row> : null}

                            {product.images && product.images.length ? <Row>
                                {product.images.map((image, i) => <Col sm={4} className="mt-3" key={i}>
                                    <Row>
                                        <Col xs={12}>
                                        <img src={imgUrl(image)}
                                        className="img-fluid" />
                                        </Col>
                                        <Col xs={12} className="mt-3">
                                            <Button variant="danger" size="sm"  type="button" onClick={() => handleDelete(image)}>
                                                <i className="fa-solid fa-trash me-2"></i> Delete
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>

                                )}
                            </Row> : null}
                        </FormItem>

                        <FormItem title="Status" label="status">
                            <br></br>
                            <Switch checked={form.status} onChange={() => setForm({
                                ...form,
                                status: !form.status,
                            })} />
                        </FormItem>

                        <FormItem title="Featured" label="featured">
                            <br></br>
                            <Switch checked={form.featured} onChange={() => setForm({
                                ...form,
                                featured: !form.featured,
                            })} />
                        </FormItem>
                        <div className="mb-3">
                            <SubmitBtn loading={loading} />
                        </div>
                    </Form>
                    }
                </Col>
            </Row>
        </Col>
    );
}