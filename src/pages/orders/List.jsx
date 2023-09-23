import { useEffect, useState } from "react";
import { Button, Col, Row , Form} from "react-bootstrap";
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
        http.get("cms/orders")
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

    const handleChange = (id , status) => {
        setLoading(true)
        http.patch(`cms/orders/${id}`,{status} )
            .then(() => http.get("cms/orders"))
            .then(({ data }) => setOrders(data))
            .catch((err) => { })
            .finally(() => setLoading(false));
    }

    return (
        <Col xs={12} className="bg-white my-3 py-3 rounded-3 shadow-sm">
            <Row>
                <Col>
                    <h1>Orders</h1>
                </Col>
              
            </Row>
            {loading ? <Loading /> : <DataTable  data={orders.map(order => {
                return {
                    
                    'Details' : <ul>{order.details.map((detail , i) => <li key={i}>
                    {`${detail.qty} x ${detail.product.name} @ Rs. ${detail.price} =Rs. ${detail.total}`}
                </li>)}</ul>,
                'User' : order.user.name,
                'Status' : <Form.Select defaultValue={order.status} onChange={ev => handleChange(order._id, ev.target.value)}>
                    <option value="Processing">Processing</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Shipping">Shipping</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </Form.Select>,
                'Created At': moment(order.createdAt).format('llll'),
                'Updated At': moment(order.updateAt).format('llll'),
                    'Action' :  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(order._id)}>
                    <i className="fa-solid fa-trash"> </i> Delete
                </Button>
                }
            })} />} 
        </Col>
    );
};
