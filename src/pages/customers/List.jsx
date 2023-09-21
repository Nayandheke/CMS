import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import http from "../../http";
import { DataTable, Loading } from "../../components";
import { Link } from "react-router-dom";
import moment from "moment"
import { confirmAlert } from "react-confirm-alert"

export const List = () => {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        http
            .get("cms/customers")
            .then(({ data }) => setCustomers(data))
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
                        http.delete(`cms/customers/${id}`)
                            .then(() => http.get('cms/customers'))
                            .then(({data}) => setCustomers(data))
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

    const handleGenerate = () => {
        setLoading(true)
        generateData()
            .then(() => http.get('cms/customers'))
            .then(({data}) => setCustomers(data))
            .catch(err => {})
            .finally(() => setLoading(false))
    }

    const generateData = async () => new Promise(async (resolve, reject) => {
        try {
            for(let i = 1; i <= 20; i++){
                console.log("gen")
                let data = {
                    name: `Customer ${i}`,
                    email: `Customer@${i}email.com`,
                    password: `Password#123`,
                    confirm_password: `Password#123`,
                    phone: `9841234567`,
                    address: `Location ${i}`,
                    status: true,
                }
                await http.post('cms/customers', data)
            }
        } catch (error) {
        }
    })

    return (
        <Col xs={12} className="bg-white my-3 py-3 rounded-3 shadow-sm">
            <Row>
                <Col>
                    <h1>Customers</h1>
                </Col>
                <Col xs="auto">
                    <Button variant="dark" onClick={handleGenerate}>
                        <i className="fa-solid fa-plus-circle me-2"></i>Generate
                    </Button>
                </Col>
                <Col xs="auto">
                    <Link className="btn btn-dark" to="/customers/create">
                        <i className="fa-solid fa-plus me-2"></i>Add Customer
                    </Link>
                </Col>
            </Row>
            {loading ? <Loading /> : <DataTable sortable={['Name', 'Email','Phone','Address','Status','Created At', 'Updated At']} searchable={['Name', 'Email','Phone','Address','Status','Created At', 'Updated At']} data={customers.map(customer => {
                return {
                    'Name' : customer.name,
                    'Email': customer.email,
                    'Phone' : customer.phone,
                    'Address' : customer.address,
                    'Status' : customer.status ? 'Active' : 'Inactive',
                    'Created At' : moment(customer.createdAt).format('lll'),
                    'Updated At' : moment(customer.updatedAt).format('lll'),
                    'Action' : <>
                    <Link to={`/customers/edit/${customer._id}`} className="btn btn-outline-dark btn-sm me-2">
                        <i className="fa-solid fa-edit"></i> Edit
                    </Link>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(customer._id)}>
                    <i className="fa-solid fa-trash"></i> Delete

                    </Button>
                    </>
                }
            })} />} 
        </Col>
    );
};
