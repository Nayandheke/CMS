import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import http from "../../http";
import { DataTable, Loading } from "../../components";
import { Link } from "react-router-dom";
import moment from "moment"
import {confirmAlert} from "react-confirm-alert"
import { toast } from "react-toastify";

export const List = () => {
    const [staffs, setStaffs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        http
            .get("cms/staffs")
            .then(({ data }) => setStaffs(data))
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
                        http.delete(`cms/staffs/${id}`)
                            .then(() => http.get('cms/staffs'))
                            .then(({data}) => setStaffs(data))
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
                    <h1>Staffs</h1>
                </Col>
                <Col xs="auto">
                    <Link className="btn btn-dark" to="/staffs/create">
                        <i className="fa-solid fa-plus me-2"></i>Add Staffs
                    </Link>
                </Col>
            </Row>
            {loading ? <Loading /> : <DataTable sortable={['Name','Email','Phone','Address','Status','Created At','Updated At']} searchable={['Name','Email']} data={staffs.map(staff => {
                return {
                    'Name' : staff.name,
                    'Email': staff.email,
                    'Phone' : staff.phone,
                    'Address' : staff.address,
                    'Status' : staff.status ? 'Active' : 'Inactive',
                    'Created At': moment(staff.createdAt).format('lll'),
                    'Updated At': moment(staff.updatedAt).format('lll'),
                    'Action' : <>
                        <Link to={`/staffs/edit/${staff._id}`} className="btn btn-outline-dark btn-sm me-2">
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
