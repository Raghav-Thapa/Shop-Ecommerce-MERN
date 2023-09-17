import { useParams } from "react-router-dom"
import { Container, Row, Image, Col } from "react-bootstrap";
// import bgimage from "../../assets/images/header-bg.jpeg"
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import category from "../admin/category/index";
import ProductListGrid from "../home/component/product-list.component";
const CategoryDetail = () => {
    let params = useParams();
    const [catDetail, setCatDetail] = useState();
    const [prodDetail, setProdDetail] = useState();
    const [loading, setLoading] = useState(true);

    const loadCategoryDetail = useCallback(async() => {
        try{

            let response = await category.categorySvc.getDetailCategory(params.slug);
            setCatDetail(response.data.categoryDetail)
            setProdDetail(response.data.productList)
        }  catch(exception) {
            toast.warn("Error during Category fetch...")
            console.log(exception);
        } finally{
            setLoading(false)
        }
    }, [params])
    useEffect(() => {
        loadCategoryDetail()
    }, [params])
    return (
        <>
            <div className="header-wrapper">
                <Row>
                    {/* <Image src={bgimage} alt="" fluid /> */}
                </Row>
            </div>
            <Container className="bg-light my-3">
                {
                    loading ? <>Loading....</> : <>
                        <Row>
                            <Col>
                                <h4>Products of {catDetail.name}</h4>
                            </Col>
                        </Row>
                        <Row>
                            {
                                prodDetail ? <>
                                    {
                                        prodDetail.map((product, index) => (
                                            <ProductListGrid
                                                key={index}
                                                product={product}
                                            />
                                        ))
                                    }
                                </> : <Col sm={12}><p className="text-danger">No products available on this category!!</p></Col>
                            }
                        </Row>
                    </>
                }
            </Container>
        </>
    )
}

export default CategoryDetail