import { Container, Breadcrumb, Card, Col, Row } from "react-bootstrap"
import { FaPlus } from "react-icons/fa"
import { NavLink } from "react-router-dom"
import DataTable from 'react-data-table-component';
import { useCallback, useEffect, useState } from "react";
import customStyles from "../../../assets/css/table";
import { toast } from "react-toastify";
import brand from ".";
import { TableActionButtons } from "../../../components/table-action.component";


const BrandListPage = () => {

   const handleDelete = async (id) => {
        try{
            let response = await brand.brandSvc.deleteBrandById(id);
            if (response.status){
                toast.success(response.msg)
                await loadBrand()
            }
        }catch(exception){
            toast.error("Error deleting brand")
        }
   }

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Image',
            selector: row => row.image,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Action',
            selector: row => <TableActionButtons
            editurl ={"/admin/brand/"+row._id}
            id= {row._id}
            deleteAction ={handleDelete}
            />
        },
    ];

    let [brandList, setBrandList] = useState();

    let[pagination, setPagination] = useState({
        currentPage:1,
        perPage:10,
        totalNoOfRows:0
    })
    let [loading, setLoading] = useState(true)

    const loadBrand = useCallback(async (perPage=10, page=1) => {
        //api call
        try {
            let response = await brand.brandSvc.listAllBrands(perPage, page);
            if (response.status) {
                setBrandList(response.result)
                setPagination(response.meta)

            }
        } catch (exception) {
            console.log("brand fetch exception", exception)
            toast.error("error fetching brand")
        }finally{
            setLoading(false)
        }
    }, []);

    const handlePageChange = page => {
		loadBrand(pagination.perPage, page)
	};

    const handlePerRowsChange = (perPage, page) => {
        loadBrand(perPage, page)
    }

    useEffect(() => {
        loadBrand()
    }, [])

    return (<>
        <Container fluid className="px-4">
            <Row>
                <Col sm={6}><h1 className="mt-4">Brand List</h1></Col>
                <Col sm={6} className="mt-5">
                    <NavLink to="/admin/brand/create" className={"btn btn-sm btn-success float-end"}>
                        <FaPlus /> Add Brand</NavLink>
                </Col>
            </Row>

            <Breadcrumb className="mb-4">

                <Breadcrumb.Item>
                    <NavLink to={"/admin"}>Dashboard</NavLink>
                </Breadcrumb.Item>

                <Breadcrumb.Item active>Brand List
                </Breadcrumb.Item>
            </Breadcrumb>


            <Card className="mb-4">
                <Card.Header>
                    <h4>Brand List</h4>
                </Card.Header>
                <Card.Body>

                    <DataTable
                        columns={columns}
                        data={brandList}
                        pagination
                        progressPending={loading}
                        dense
                        customStyles={customStyles}
                        paginationServer
                        paginationTotalRows={pagination.totalNoOfRows}
                        onChangeRowsPerPage={handlePerRowsChange}
                        onChangePage={handlePageChange} 
                        />

                    <table></table>
                </Card.Body>
            </Card>
        </Container>
    </>)
}

export default BrandListPage