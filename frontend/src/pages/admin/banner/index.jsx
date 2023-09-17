import BannerCreateForm from "./banner-create.page";
import BannerEditForm from "./banner-edit.page";
import BannerService from "./banner.service";
import BannerListPage from "./banner-list.page";

const bannerSvc= new BannerService()
export default {
    BannerCreateForm,
    bannerSvc,
    BannerListPage,
    BannerEditForm,
}