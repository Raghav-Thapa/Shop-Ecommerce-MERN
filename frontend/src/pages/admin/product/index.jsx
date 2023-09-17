import ProductCreateForm from "./product-create.page";
import ProductEditForm from "./product-edit.page";
import ProductService from "./product.service";
import ProductListPage from "./product-list.page";

const productSvc= new ProductService()
export default {
    ProductCreateForm,
    productSvc,
    ProductListPage,
    ProductEditForm,
}