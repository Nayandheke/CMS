import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import http from "../../http";
import { DataTable, Loading } from "../../components";
import { Link } from "react-router-dom";
import moment from "moment"
import {confirmAlert} from "react-confirm-alert"
import { toast } from "react-toastify";

export const List = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        http
            .get("cms/reviews")
            .then(({ data }) => setReviews(data))
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
                        http.delete(`cms/reviews/${id}`)
                            .then(() => http.get('cms/reviews'))
                            .then(({data}) => setReviews(data))
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
                    <h1>Reviews</h1>
                </Col>
            </Row>
            {loading ? <Loading /> : <DataTable data={reviews.map(review => {
                return {
                    'Product' : review.product.name,
                    'User' : review.user.name,
                    'Comment' : review.comment,
                    'Rating' : review.rating,
                    'Created At': moment(review.createdAt).format('llll'),
                    'Updated At': moment(review.updateAt).format('llll'),
                    'Action' : <Button variant="outline-danger" size="sm" onClick={() => handleDelete(review._id)}>
                    <i className="fa-solid fa-trash"> </i> Delete
                </Button>
                }
            })} />} 
        </Col>
    );
};
