import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import http from "../../http";
import { DataTable, Loading } from "../../components";
import { Link } from "react-router-dom";
import moment from "moment"
import { confirmAlert } from "react-confirm-alert"
import { imgUrl } from "../../lib";

export const List = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        http
            .get("cms/products")
            .then(({ data }) => setProducts(data))
            .catch((err) => { })
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = id => {
        confirmAlert({
            title: 'Delete',
            message: 'Are you sure you want to delete this item?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        setLoading(true)
                        http.delete(`cms/products/${id}`)
                            .then(() => http.get('cms/products'))
                            .then(({data}) => setProducts(data))
                            .catch(err => {})
                            .finally(() => setLoading(false))
                    },
                    style: {
                        backgroundColor: '#f00',
                        color: 'fff'
                    }
                },
                {
                    label: 'No'
                }
            ]
        });
    }

    // const handleGenerate = () => {
    //     setLoading(true)
    //     generateData()
    //         .then(() => http.get('cms/products'))
    //         .then(({data}) => setProducts(data))
    //         .catch(err => {})
    //         .finally(() => setLoading(false))
    // }

    // const generateData = async () => new Promise(async (resolve, reject) => {
    //     try {
    //         for(let i = 1; i <= 20; i++){
    //             console.log("gen")
    //             let data = {
    //                 name: `Category ${i}`,
    //                 status: true,
    //             }
    //             await http.post('cms/products', data)
    //         }
    //     } catch (error) {
    //     }
    // })

    return (
        <Col xs={12} className="bg-white my-3 py-3 rounded-3 shadow-sm">
            <Row>
                <Col>
                    <h1>Products</h1>
                </Col>
                {/* <Col xs="auto">
                    <Button variant="dark" onClick={handleGenerate}>
                        <i className="fa-solid fa-plus-circle me-2"></i>Generate
                    </Button>
                </Col> */}
                <Col xs="auto">
                    <Link className="btn btn-dark" to="/products/create">
                        <i className="fa-solid fa-plus me-2"></i>Add Products
                    </Link>
                </Col>
            </Row>
            {loading ? <Loading /> : <DataTable sortable={['Name','Category','Brand','Price','Dis. Price','Status','Created At', 'Updated At']} searchable={['Name' ,'Status','Created At', 'Updated At']} data={products.map(product => {
                return {
                    'Name' : product.name,
                    'Image' : <img src={imgUrl(product.image[0])} className="img-sm ms-4"/>,
                    'Category' : product.category.name,
                    'Brand' : product.brand.name,
                    'Price' : product.price,
                    'Dis. Price' : product.discounted_price || 0,
                    'Featured' : product.featured ? 'Yes' : 'No',
                    'Status' : product.status ? 'Active' : 'Inactive',
                    'Created At' : moment(product.createdAt).format('lll'),
                    'Updated At' : moment(product.updatedAt).format('lll'),
                    'Action' : <>
                    <Link to={`/products/edit/${product._id}`} className="btn btn-outline-dark btn-sm me-2">
                        <i className="fa-solid fa-edit"></i> Edit
                    </Link>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(product._id)}>
                    <i className="fa-solid fa-trash"></i> Delete
                    </Button>
                    </>
                }
            })} />} 
        </Col>
    );
};