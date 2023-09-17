import UserCreateForm from "./user-create.page";
import UserEditForm from "./user-edit.page";
import UserService from "./user.service";
import UserListPage from "./user-list.page";

const userSvc= new UserService()
export default {
    UserCreateForm,
    userSvc,
    UserListPage,
    UserEditForm,
}