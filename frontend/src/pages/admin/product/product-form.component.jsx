import { Form, Col, Button, Row } from "react-bootstrap";
import { TextAreaInput, TextInput } from "../../../components/from.components";
import { FaPaperPlane, FaRedo, FaPlus,FaMinus } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCallback, useEffect, useState } from "react";

import Select from 'react-select'
import { useSelector } from "react-redux";
import category from "../category";
import brand from "../brand";
import user from "../user"


const ProductForm = ({ submitAction, detail = null }) => {

  const [attributes, setAttributes] = useState();
  const [categories, setCategories] = useState();
  const [brands, setBrands] = useState();
  const[sellers, setSellers] = useState();

  const loadCategories = useCallback(async() => {
    try {
      let allCats = await category.categorySvc.listAllCategorys();
      if(allCats) {
        let catOps = allCats.result.map((item) => {
          return {
            value: item._id, 
            label: item.name
          }
        })

        setCategories(catOps);
      }
    } catch(exception) {
      console.log(exception);
    }
  }, [])

  const loadBrands = useCallback(async() => {
    try {
      let allBrands = await brand.brandSvc.listAllBrands()
      if(allBrands) {
        let brandOpts = allBrands.result.map((item) => {
          return {
            value: item._id, 
            label: item.name
          }
        })

        setBrands(brandOpts);
      }
    } catch(exception) {
      console.log(exception);
    }
  }, [])

  const loadSellers = useCallback(async() => {
    try{
        let allSellers = await user.userSvc.listAllUsers()
        if(allSellers){
           let sellerOps = allSellers.result.map((item) => {
                return{
                    value: item._id,
                label:item.name }
            })
            setSellers(sellerOps)
        }

    }catch(exception){
        console.log(exception)
    }
}, [])


  useEffect(() => {
    loadCategories()
    loadBrands()
    loadSellers()
  }, [])

  let loggedinUser = useSelector((root) => {
    return root.User.loggedInUser;
  })

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    status: Yup.string()
      .matches(/active|inactive/)
      .required(),
    detail: Yup.string().required(),
    categories: Yup.array().of(Yup.object()).nullable().default(null),
    attributes: Yup.array().of(Yup.object()).nullable().default(null),
    price: Yup.number().min(1).required(), 
    discount: Yup.number().min(0).max(99).nullable().default(0),
    isFeatured: Yup.boolean().default(false),
    brand: Yup.object().nullable().default(null),
    sellerId: Yup.object().nullable().default(loggedinUser?._id),
    images: Yup.array(),
  });


  let formik = useFormik({
    initialValues: {
      name: "",
      detail: "",
      categories: null,
      attributes: "",
      price: "", 
      discount: 0,
      isFeatured: false,
      brand: null,
      sellerId: loggedinUser?._id,
      status: "inactive",
      images: [],
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      values.categories = (values.categories.map((cat) => cat.value)).join(",");
      values.brand = values.brand.value
      values.sellerId = values.sellerId?.value ?? null
      values.attributes = JSON.stringify(attributes);

      const formData = new FormData();
      console.log(values.images);
      
      if(values.images){
        values.images.map((image) => {
          if(typeof image === 'object'){
            formData.append('images', image, image.filename)
          }
        })
        delete values.images;
      }
      Object.keys(values).map((field) => {
        
        formData.append(field, values[field])
      })
      submitAction(formData);
    },
  });

  useEffect(() => {
    if (detail) {
      formik.setValues({
        ...detail
      });
      setAttributes(detail.attributes)
    }
  }, [detail]);


  

  const addAttribute = () => {
    let attr = {
      key: null, 
      value: null
    }
    let allAttr = []
    if(attributes){
      allAttr = [...attributes]
    } 
    allAttr.push(attr);

    setAttributes(
      allAttr
    )
  }

  const removeAttribute = (index) => {
    let allAttrs = [...attributes];
    allAttrs.splice(index, 1);
    setAttributes(allAttrs)
  }

  return (
    <>
    
      <Form onSubmit={formik.handleSubmit}>
        <TextInput
          label="Name"
          name="name"
          value={formik.values?.name}
          changeEvent={formik.handleChange}
          placeholder="Enter name..."
          error={formik.errors?.name}
        />
        
        <TextAreaInput 
          label="Detail"
          name="detail"
          value={formik.values?.detail}
          changeEvent={(data) => {
            if(data) {
              formik.setValues({
                ...formik.values, 
                detail: data
              })
            }
          }}
          placeholder="Enter Detail..."
          error={formik.errors?.detail}
        />
        
        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Categories: </Form.Label>
          <Col sm={9}>
            <Select 
              options={categories} 
              name="categories"
              value={formik.values?.categories}
              onChange={(selcOpt) => {
                formik.setValues({
                  ...formik.values, 
                  categories: selcOpt
                })
              }}
              isMulti/>
            <span className="text-danger">{formik.errors?.categories}</span>
          </Col>
        </Form.Group>
        
        <TextInput
          label="Price"
          name="price"
          type="number"
          required={true}
          value={formik.values?.price}
          changeEvent={formik.handleChange}
          placeholder="Enter Price..."
          error={formik.errors?.price}
        />

        <TextInput
          label="Discount"
          name="discount"
          type="number"
          value={formik.values?.discount}
          changeEvent={formik.handleChange}
          placeholder="Enter discount..."
          error={formik.errors?.discount}
        />


        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Brand: </Form.Label>
          <Col sm={9}>
            <Select 
              options={brands} 
              name="brand"
              value={formik.values?.brand}
              onChange={(selcOpt) => {
                formik.setValues({
                  ...formik.values, 
                  brand: selcOpt
                })
              }} />
            <span className="text-danger">{formik.errors?.brand}</span>
          </Col>
        </Form.Group>


        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Featured: </Form.Label>
          <Col sm={9}>
            <Form.Check 
                type="switch"
                id="custom-switch"
                label={formik.values.isFeatured ? "No" : "Yes"}
                onChange={(e) => {
                  formik.setValues({
                    ...formik.values,
                    isFeatured: e.target.checked
                  })
                }}
              />
            <span className="text-danger">{formik.errors?.isFeatured}</span>
          </Col>
        </Form.Group>

        
        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Seller: </Form.Label>
          <Col sm={9}>
            <Select 
              options={sellers} 
              name="sellerId"
              value={formik.values?.sellerId}
              onChange={(selcOpt) => {
                formik.setValues({
                  ...formik.values, 
                  sellerId: selcOpt
                })
              }} />
            <span className="text-danger">{formik.errors?.sellerId}</span>
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Status: </Form.Label>
          <Col sm={9}>
            <Form.Select
              name="status"
              value={formik.values?.status}
              required
              onChange={formik.handleChange}
              size="sm"
            >
              <option>-- Select Any one --</option>
              <option value={"active"}>Publish</option>
              <option value={"inactive"}>Un-Publish</option>
            </Form.Select>
            <span className="text-danger">{formik.errors?.status}</span>
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Images: </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="file"
              size="sm"
              multiple
              name="image"
              onChange={(e) => {
                let files = Object.values(e.target.files);


                // [{}, {}, {}]
                let images = [];
                let errors = [];

                files.map((image) => {

                  let ext = image.name.split(".").pop();
                  if (
                    ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"].includes(
                      ext.toLowerCase()
                    )
                  ) {
                    images.push(image)
                  } else {
                    errors.push("File format not supported")
                  }
                })
                if(errors.length){
                  formik.setErrors({
                    ...formik.errors, 
                    images: errors.join("\n")
                  })
                } else {
                  
                  formik.setValues({
                    ...formik.values, 
                    images: images
                  })
                }

              }}
              accept="image/*"
            />
            <span className="text-danger">{formik.errors?.images}</span>
          </Col>
        </Form.Group>

        <Form.Group className="row mb-3">
          <Form.Label className="col-sm-3">Atrributes: </Form.Label>
          <Col sm={9}>
            
            {
              attributes && attributes.map((item, key) => (
                <Row className="mb-3" key={key}>
                  <Col sm={5}>
                    <Form.Control 
                      type="text" 
                      size="sm" placeholder="Attribute Key"
                      value={item.key}
                      onChange={(e) => {
                        let allAttrs = [...attributes]
                        allAttrs[key].key = e.target.value
                        setAttributes(allAttrs)
                      }}
                    />
                  </Col>
                  <Col sm={5}>
                    <Form.Control
                      onChange={(e) => {
                        let allAttrs = [...attributes]
                        allAttrs[key].value = [e.target.value]
                        setAttributes(allAttrs)
                      }}
                      value={item.value}
                    type="text" size="sm" placeholder="Attribute value"/>
                  </Col>
                  <Col sm={2}>
                    <Button size="sm" variant="danger" onClick={(e) => {
                      removeAttribute(key)
                    }}>
                      <FaMinus />
                    </Button>
                  </Col>
                </Row>
              ))
            }

            <Row>
              <Col sm={12}>
                <Button variant="success" type="button" size="sm" onClick={addAttribute}>
                  <FaPlus /> Add More
                </Button>
              </Col>
            </Row>
          </Col>
        </Form.Group>



        <Form.Group className="row mb-3">
          <Col sm={{ offset: 3, span: 9 }}>
            <Button variant="success" className="me-3" type="submit" size="sm">
              <FaPaperPlane /> Submit
            </Button>
            <Button variant="danger" type="reset" size="sm">
              <FaRedo /> Cancel
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default ProductForm;