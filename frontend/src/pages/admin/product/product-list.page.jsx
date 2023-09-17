import { Container, Breadcrumb, Card, Row, Col } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";

import DataTable from 'react-data-table-component';

import { useCallback, useEffect, useState } from "react";
import customStyles from "../../../assets/css/table";
import { toast } from "react-toastify";
import product from "./";
import { TableActionButtons } from "../../../components/table-action.component";

const ProductListPage = () => {
    const handleDelete = async (id) => {
        try{
            setLoading(true)
            let response = await product.productSvc.deleteProductById(id);
            if(response.status){
                toast.success(response.msg)
                await loadProducts()
            }
        } catch(exception){
            toast.error("Error while deleting Product")
        }
    }
    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Category',
            selector: row => row.categories ? (row.categories.map((item) => item.name)).join(", ") : "-",
        },
        {
            name: 'Price',
            selector: row => "Npr. "+row.afterDiscount,
        },
        {
            name: 'Brand',
            selector: row => row.brand?.name,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Action',
            selector: row => <TableActionButtons 
                editurl={"/admin/product/"+row._id}
                id={row._id}
                deleteAction={handleDelete}
            />,
        },
    ];
    

    let [productList, setProductList] = useState();
    let [pagination, setPagination] = useState({
        currentPage:1, 
        perPage:10,
        totalNoOfRows:0
    })
    let [loading, setLoading] = useState(true)


    const loadProducts = useCallback(async(perPage=10, page=1) => {
        try{
            let response = await product.productSvc.listAllProducts(perPage, page);
            if(response.status){
                setProductList(response.result)
                setPagination(response.meta)
            }
        } catch(exception) {
            console.log("Baner Fetch Exception: ", exception)
            toast.error("Error while fetching product")
        }finally{
            setLoading(false)
        }
    }, []);

    const handlePageChange = page => {
		loadProducts(pagination.perPage, page)
	};

    const handlePerRowsChange = (perPage, page) => {
        loadProducts(perPage, page)
    }

    useEffect(() => {
        loadProducts()
    }, [])

    return (<>
    
    <Container fluid className="px-4">
            <Row>
                <Col sm={6}><h1 className="mt-4">Product List </h1></Col>
                <Col sm={6} className="mt-5">
                    <NavLink to="/admin/product/create" className={"btn btn-sm btn-success float-end"}>
                        <FaPlus /> Add Product
                    </NavLink>
                </Col>
            </Row>
            <Breadcrumb className="mb-4">
                <li className="breadcrumb-item">
                    <Link role="button" className={"breadcrumb-item"} to="/admin">Dashboard</Link>
                </li>
                <Breadcrumb.Item active>Product List </Breadcrumb.Item>
            </Breadcrumb>

            <Card className="mb-4">
                <Card.Header>
                    <h4>Product List </h4>
                </Card.Header>
                <Card.Body>
                    <DataTable
                        columns={columns}
                        data={productList}
                        pagination
                        progressPending={loading}
                        dense
                        customStyles={customStyles}
                        paginationServer
                        paginationTotalRows={pagination.totalNoOfRows}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePageChange}
                    />

                </Card.Body>
            </Card>
        </Container>
    </>)
}

export default ProductListPage;