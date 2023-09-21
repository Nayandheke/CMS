import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import http from "../../http";
import { DataTable, Loading } from "../../components";
import { Link } from "react-router-dom";
import moment from "moment"
import {confirmAlert} from "react-confirm-alert"
import { toast } from "react-toastify";

export const List = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        http
            .get("cms/orders")
            .then(({ data }) => setOrders(data))
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
                        http.delete(`cms/orders/${id}`)
                            .then(() => http.get('cms/orders'))
                            .then(({data}) => setOrders(data))
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
                    <h1>Orders</h1>
                </Col>
                <Col xs="auto">
                    <Link className="btn btn-dark" to="/orders/create">
                        <i className="fa-solid fa-plus me-2"></i>Add Orders
                    </Link>
                </Col>
            </Row>
            {loading ? <Loading /> : <DataTable sortable={['Status','Created At','Updated At']} searchable={['Status','Created At','Updated At']} data={orders.map(staff => {
                return {
                    
                    'Status' : staff.status ? 'Active' : 'Inactive',
                    'Created At': moment(staff.createdAt).format('lll'),
                    'Updated At': moment(staff.updatedAt).format('lll'),
                    'Action' : <>
                        <Link to={`/orders/edit/${staff._id}`} className="btn btn-outline-dark btn-sm me-2">
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
