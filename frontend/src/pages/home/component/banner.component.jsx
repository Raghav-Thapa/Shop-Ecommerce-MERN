import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import banner from "../../admin/banner";

export const BannerSection = () => {
    // return (

    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        // autoplaySpeed: 2000,
      };
  
      const [bannerlist, setBannerList ] = useState()
  
      const loadBanners = useCallback(async() => {
        try {
          let response = await banner.bannerSvc.listHomePageBannerData();
          if(response.result) {
            setBannerList(response.result)
          }
        } catch(exception) {
          toast.warn("Error fetching the banner...")
        }
      }, [])
  
      useEffect(() => {
        loadBanners()
      }, [])

      return (
        <>
         <div style={{margin:"25px"}} >
            <Slider {...settings}>
              {
                bannerlist && bannerlist.map((banner, index) => (
                  <div key={index}>
                    <a href={banner.link} target="_blank">
                  <img className="d-block w-100" src={import.meta.env.VITE_IMAGE_URL+"/banners/"+banner.image} />
                    </a>
                  </div>
                    
                ))
              }
            </Slider>
            </div>
 
        </>
      );
        }



        // <Carousel>
        //     <Carousel.Item>
        //         <img
        //             className="d-block w-100"
        //             src="./src/assets/images/bannerthree.jpg"
        //             alt="First slide"
        //         />
        //         <Carousel.Caption>
        //             <h3>First slide label</h3>
        //             <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        //         </Carousel.Caption>
        //     </Carousel.Item>
        //     <Carousel.Item>
        //         <img
        //             className="d-block w-100"
        //             src="./src/assets/images/bannertwo.jpg"
        //             alt="Second slide"
        //         />

        //         <Carousel.Caption>
        //             <h3>Second slide label</h3>
        //             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        //         </Carousel.Caption>
        //     </Carousel.Item>
        //     <Carousel.Item>
        //         <img
        //             className="d-block w-100"
        //             src="./src/assets/images/bannerone.jpg"
        //             alt="Third slide"
        //         />

        //         <Carousel.Caption>
        //             <h3>Third slide label</h3>
        //             <p>
        //                 Praesent commodo cursus magna, vel scelerisque nisl consectetur.
        //             </p>
        //         </Carousel.Caption>
        //     </Carousel.Item>
        // </Carousel>
    // )
// }