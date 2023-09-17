import { Container, Breadcrumb, Card, Row, Col } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";

import DataTable from 'react-data-table-component';

import { useCallback, useEffect, useState } from "react";
import customStyles from "../../../assets/css/table";
// import { customStyles } from "../../../assets/css/table";
import { toast } from "react-toastify";
import { TableActionButtons } from "../../../components/table-action.component";

import cartService from "../../product/cart.service";
import { DateFormat } from "../banner/banner-list.page";


const OrderList = () => {
    const columns = [
        {
            name: 'Cart Code',
            selector: row => row.cartCode,
            sortable: true,
        },
        {
            name: 'Buyer',
            selector: row => row.buyer.name,
        },
        {
            name: 'Total',
            selector: row => row.total,
            sortable: true,
        },
        {
            name: 'Order Date',
            selector: row => <DateFormat date={row.createdAt} />,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Action',
            selector: row => <TableActionButtons 
                editurl={"/admin/order/"+row._id}
                id={row._id}
                
            />,
        },
    ];
    

    let [orderList, setOrderList] = useState();
    let [pagination, setPagination] = useState({
        currentPage:1, 
        perPage:10,
        totalNoOfRows:0
    })
    let [loading, setLoading] = useState(true)


    const loadOrders = useCallback(async(perPage=10, page=1) => {
        try{
            let response = await cartService.listAllCarts()
            setOrderList(response.result)
        } catch(exception) {
            console.log("Baner Fetch Exception: ", exception)
            toast.error("Error while fetching order")
        }finally{
            setLoading(false)
        }
    }, []);

    const handlePageChange = page => {
		loadOrders(pagination.perPage, page)
	};

    const handlePerRowsChange = (perPage, page) => {
        loadOrders(perPage, page)
    }

    useEffect(() => {
        loadOrders()
    }, [])

    return (<>
    
    <Container fluid className="px-4">
            <Row>
                <Col sm={6}><h1 className="mt-4">Order List </h1></Col>
                <Col sm={6} className="mt-5">
                    <NavLink to="/admin/order/create" className={"btn btn-sm btn-success float-end"}>
                        <FaPlus /> Add Order
                    </NavLink>
                </Col>
            </Row>
            <Breadcrumb className="mb-4">
                <li className="breadcrumb-item">
                    <Link role="button" className={"breadcrumb-item"} to="/admin">Dashboard</Link>
                </li>
                <Breadcrumb.Item active>Order List </Breadcrumb.Item>
            </Breadcrumb>

            <Card className="mb-4">
                <Card.Header>
                    <h4>Order List </h4>
                </Card.Header>
                <Card.Body>
                    <DataTable
                        columns={columns}
                        data={orderList}
                        pagination
                        progressPending={loading}
                        dense="dense"
                        customStyles={customStyles}
                        paginationServer
                        responsive="true"
                        paginationTotalRows={pagination.totalNoOfRows}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePageChange}
                    />

                </Card.Body>
            </Card>
        </Container>
    </>)
}
export default OrderList