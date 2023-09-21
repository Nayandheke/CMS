import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import http from "../../http";
import { DataTable, Loading } from "../../components";
import { Link } from "react-router-dom";
import moment from "moment"
import {confirmAlert} from "react-confirm-alert"
import { toast } from "react-toastify";

export const List = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        http
            .get("cms/brands")
            .then(({ data }) => setBrands(data))
            .catch((err) => { })
            .finally(() => setLoading(false));
    }, []);

    const handleDelete = id => {
        confirmAlert({
            title: 'Delete',
            message: 'Are you sure you want to delete this item ?',
            buttons: [
                {
                    label:'Yes',
                    onClick: () => {
                        setLoading(true)
                        http.delete(`cms/brands/${id}`)
                            .then(() => http.get('cms/brands'))
                            .then(({data}) => setBrands(data))
                            .catch(err => toast.error(err))
                            .finally(() => setLoading(false))
                    },
                    style: {
                        backgroundColor: '#f00',
                        color:'#fff',
                    },
                },
                {
                    label: 'No',
                },
            ],
        });
    }

    return (
        <Col xs={12} className="bg-white my-3 py-3 rounded-3 shadow-sm">
            <Row>
                <Col>
                    <h1>Brands</h1>
                </Col>
                <Col xs="auto">
                    <Link className="btn btn-dark" to="/brands/create">
                        <i className="fa-solid fa-plus me-2"></i>Add Brands
                    </Link>
                </Col>
            </Row>
            {loading ? <Loading /> : <DataTable sortable={['Name',,'Status','Created At','Updated At']} searchable={['Name','Status','Created At','Updated At']} data={brands.map(brand => {
                return {
                    'Name' : brand.name,
                    'Status' : brand.status ? 'Active' : 'Inactive',
                    'Created At': moment(brand.createdAt).format('lll'),
                    'Updated At': moment(brand.updatedAt).format('lll'),
                    'Action' : <>
                        <Link to={`/brands/edit/${brand._id}`} className="btn btn-outline-dark btn-sm me-2">
                            <i className="fa-solid fa-edit me-2"></i>Edit 
                        </Link>
                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(brand._id)}>
                            <i className="fa-solid fa-trash"> </i> Delete
                        </Button>
                    </>
                }
            })} />} 
        </Col>
    );
};
