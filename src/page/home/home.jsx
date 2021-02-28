import React,{Component, Fragment} from 'react';
import SwiperCore, { Navigation, Pagination, Scrollbar,Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
SwiperCore.use([Navigation, Pagination, Scrollbar,Autoplay]);
class Home extends Component{
    constructor(props){
        super(props);
        
    }
    move(){
        console.log(123);
    }
    render(){
        return(
        
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
              autoplay ={{
                autoplay:true,
                disableOnInteraction: false,
                delay:2000
              }}
              loop={true}
              
            >
              <SwiperSlide><img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3538063944,2372071804&fm=26&gp=0.jpg" alt=""/></SwiperSlide>
              <SwiperSlide><img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2731033506,3601638208&fm=26&gp=0.jpg" alt=""/></SwiperSlide>
              <SwiperSlide><img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1253275505,783194641&fm=26&gp=0.jpg" alt=""/></SwiperSlide>
              <SwiperSlide><img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3896670447,3175994811&fm=26&gp=0.jpg" alt=""/></SwiperSlide>
              
            </Swiper>
          )
    }
}
export default Home;