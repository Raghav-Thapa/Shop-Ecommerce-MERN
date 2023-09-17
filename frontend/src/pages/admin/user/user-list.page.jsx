import { Container, Breadcrumb, Card, Col, Row } from "react-bootstrap"
import { FaPlus } from "react-icons/fa"
import { NavLink } from "react-router-dom"
import DataTable from 'react-data-table-component';
import { useCallback, useEffect, useState } from "react";
import customStyles from "../../../assets/css/table";
import { toast } from "react-toastify";
import user from ".";
import { TableActionButtons } from "../../../components/table-action.component";


const UserListPage = () => {

   const handleDelete = async (id) => {
        try{
            let response = await user.userSvc.deleteUserById(id);
            if (response.status){
                toast.success(response.msg)
                await loadUser()
            }
        }catch(exception){
            toast.error("Error deleting user")
        }
   }

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
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
            name: 'Role',
            selector: row => row.role,
            sortable: true,
        },
        {
            name: 'Action',
            selector: row => <TableActionButtons
            editurl ={"/admin/user/"+row._id}
            id= {row._id}
            deleteAction ={handleDelete}
            />
        },
    ];

    let [userList, setUserList] = useState();

    let[pagination, setPagination] = useState({
        currentPage:1,
        perPage:10,
        totalNoOfRows:0
    })
    let [loading, setLoading] = useState(true)

    const loadUser = useCallback(async (perPage=10, page=1) => {
        //api call
        try {
            let response = await user.userSvc.listAllUsers(perPage, page);
            if (response.status) {
                setUserList(response.result)
                setPagination(response.meta)

            }
        } catch (exception) {
            console.log("user fetch exception", exception)
            toast.error("error fetching user")
        }finally{
            setLoading(false)
        }
    }, []);

    const handlePageChange = page => {
		loadUser(pagination.perPage, page)
	};

    const handlePerRowsChange = (perPage, page) => {
        loadUser(perPage, page)
    }

    useEffect(() => {
        loadUser()
    }, [])

    return (<>
        <Container fluid className="px-4">
            <Row>
                <Col sm={6}><h1 className="mt-4">User List</h1></Col>
                <Col sm={6} className="mt-5">
                    <NavLink to="/admin/user/create" className={"btn btn-sm btn-success float-end"}>
                        <FaPlus /> Add User</NavLink>
                </Col>
            </Row>

            <Breadcrumb className="mb-4">

                <Breadcrumb.Item>
                    <NavLink to={"/admin"}>Dashboard</NavLink>
                </Breadcrumb.Item>

                <Breadcrumb.Item active>User List
                </Breadcrumb.Item>
            </Breadcrumb>


            <Card className="mb-4">
                <Card.Header>
                    <h4>User List</h4>
                </Card.Header>
                <Card.Body>

                    <DataTable
                        columns={columns}
                        data={userList}
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

export default UserListPage