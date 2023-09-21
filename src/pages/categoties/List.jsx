import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import http from "../../http";
import { DataTable, Loading } from "../../components";
import { Link } from "react-router-dom";
import moment from "moment"
import {confirmAlert} from "react-confirm-alert"
import { toast } from "react-toastify";

export const List = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        http
            .get("cms/categories")
            .then(({ data }) => setCategories(data))
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
                        http.delete(`cms/categories/${id}`)
                            .then(() => http.get('cms/categories'))
                            .then(({data}) => setCategories(data))
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
                    <h1>Categories</h1>
                </Col>
                <Col xs="auto">
                    <Link className="btn btn-dark" to="/categories/create">
                        <i className="fa-solid fa-plus me-2"></i>Add categories
                    </Link>
                </Col>
            </Row>
            {loading ? <Loading /> : <DataTable sortable={['Name',,'Status','Created At','Updated At']} searchable={['Name','Status','Created At','Updated At']} data={categories.map(staff => {
                return {
                    'Name' : staff.name,
                   
                    'Status' : staff.status ? 'Active' : 'Inactive',
                    'Created At': moment(staff.createdAt).format('lll'),
                    'Updated At': moment(staff.updatedAt).format('lll'),
                    'Action' : <>
                        <Link to={`/categories/edit/${staff._id}`} className="btn btn-outline-dark btn-sm me-2">
                            <i className="fa-solid fa-edit me-2"></i>Edit 
                        </Link>
                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(staff._id)}>
                            <i className="fa-solid fa-trash"> </i> Delete
                        </Button>
                    </>
                }
            })} />} 
        </Col>
    );
};
