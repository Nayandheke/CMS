import { useEffect, useState } from "react";
import { Col, Form, Pagination, Row, Table } from "react-bootstrap";
import moment from "moment";

export const DataTable = ({ data = [], searchable = [], sortable = [] }) => {
    const [term, setTerm] = useState('')
    const [filtered, setFiltered] = useState([])
    const [paginated, setPaginated] = useState([])
    const [sortBy, setSortBy] = useState('')
    const [direction, setDirection] = useState('desc')
    const [current, setCurrent] = useState(1)
    const [pages, setPages] = useState(1)
    const [limit, setLimit] = useState(10)
    const [offset, setOffset] = useState(0)
    const [pagelinks, setPagelinks] = useState([])

    useEffect(() => {
        if(term.length){
            let temp = data.filter(item => {
                for(let k of searchable){
                    if(`${item[k]}`.toLowerCase().includes(term.toLowerCase())){
                        return true
                    }
                }
                return false
            })
            setFiltered(temp)
        } else{
            setFiltered(data)
        }

        setSortBy('')
        setDirection('desc')
        setCurrent(1)
    }, [term])

    useEffect(() => {
    if(sortBy.length){
        let sorted = [...filtered].sort((a,b) => {
            if (isNaN(parseFloat(a[sortBy])) || isNaN(parseFloat(b[sortBy])))
            {
                if(moment(a[sortBy]).isValid() && moment(b[sortBy]).isValid ()){
                    return moment (a[sortBy]) - moment(b[sortBy])
                }
                else{
                    let x = a[sortBy].toLowerCase()
                    let y = b[sortBy].toLowerCase()
                    if (x < y) {return -1}
                    if (x > y) {return 1}
                    return 0
                }  
            }
            else{
                return a[sortBy] - b[sortBy]
            }
        })
        if (direction == 'desc'){
            sorted.reverse()
        }
        setFiltered(sorted)
        setCurrent(1)
    }

    }, [sortBy, direction])

    useEffect(() => {
        setCurrent(1)

        let temp = [...filtered].splice(offset, limit)
        let total = (Math.ceil(filtered.length / limit))

        setPaginated(temp)
        setPages(total)
    }, [filtered, limit])

    useEffect(() => {
        let temp = (current - 1) * limit
        setOffset(temp)
    }, [current])

    useEffect(() => {
        let temp = [...filtered].splice(offset, limit)

        setPaginated(temp)
    }, [offset,filtered])

    useEffect(() => {
        let list = [<Pagination.Prev onClick={() => setCurrent(current - 1)} disabled={current == 1}/>]
        for(let i = 1; i <= pages; i++){
            list.push(<Pagination.Item key={i} onClick={() => setCurrent(i)} active={i == current}>{i}</Pagination.Item>)
        }

        list.push(<Pagination.Prev onClick={() => setCurrent(current + 1)} disabled={current == pages}/>)

        setPagelinks(list)
    }, [pages, current])

    const handleSort = k => {
        if(sortable.includes(k)){
            if(k == sortBy){
                setDirection(direction == 'asc' ? 'desc' : 'asc')
            } else{
                setSortBy(k)
                setDirection('desc')
            }
        }
    }

    return (
        <Row>
            <Col xs="auto" className="my-3">
                <Form.Label htmlFor="perPage">Per Page:</Form.Label>
                <Form.Select id="perPage" defaultValue={limit} onChange={ev => setLimit(ev.target.value)}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </Form.Select>
            </Col>
            <Col sm={4} className="my-3 ms-auto">
                <input type="search" name="term" id="term" className="form-control" placeholder="Search..." onChange={ev => setTerm(ev.target.value)}/>
            </Col>
            <Col xs={12}>
                {paginated.length ? <>
                    <Table bordered striped hover size="sm">
                        <thead className="table-dark">
                            <tr>
                            {Object.keys(paginated[0]).map(k => <th key={k} className={sortable.includes(k) ? 'sortable' : ''} onClick={() => handleSort(k)}>{k}
                            {sortBy == k ? <i className={`ms-3  fa-solid fa-chevron-${direction == 'asc' ? 'up' : 'down'}`}></i> : null}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.map((item, i) => <tr key={i}>
                                {Object.values(item).map( (v,i) => <td key={i}>{v}</td>)}
                            </tr>)}
                        </tbody>
                    </Table>
                {
                  (pages > 1 ?   <Pagination >
                    {pagelinks.map(link => link)}
                </Pagination>:null)
                }
                </> : (
                    <h4 className="text-muted fst-italic">No data found.</h4>
                )}
            </Col>
        </Row>
    );
};
