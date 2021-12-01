import React from "react";
import { Carousel, CarouselItem,CarouselControl, UncontrolledCarousel } from "reactstrap";




class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            activeIndex : 0,
        }
    }


    render() { 
        return ( 
            <div>
                <div>
                    <UncontrolledCarousel
                    items={[
                        {
                            key:1,
                            src:"https://ecs7.tokopedia.net/img/blog/promo/2019/05/General-Tokopedia-Banner-Testing-byme-940x339.jpg"
                        },
                        {
                            key:2,
                            src:"https://ecs7.tokopedia.net/img/blog/promo/2021/10/Featured-Image.jpg"
                        },
                        {
                            key:3,
                            src:"https://ecs7.tokopedia.net/img/blog/promo/2021/10/Feature-Image_940x339_Regular-Installment-Q4-1.jpg"
                        }
                    ]}
                    />
                </div>  

                <div className="container-fluid my-3">
                    <div className="container">
                    <div className="row my-3">
                        <div className="col-12 col-md-5 ">
                            <div className="w-auto">
                            <img className ="img-fluid shadow bg-white rounded p-1" style={{marginLeft:"auto"}} width="100%" alt="featurette" 
                            src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/107/0810720_PE771385_S4.jpg"/>
                            </div>
                        </div>
                        <div className="col-12 col-md-7 my-md-auto mt-3">
                            <p className="h2">IDALINNEA D</p>
                            <p className="h4 text-muted">IKEA | Perabotan</p>
                            <p className="lead text-justify text-md-left">
                            Ritsleting yang tersembunyi membuat sarung mudah dilepas.  Sarung bantal dengan tampilan cermin karena memiliki pola yang sama di kedua sisi.  
                            Katun adalah bahan alami lembut dan mudah dirawat yang dapat Anda cuci dengan mesin.</p>
                        </div>
                        </div>
                    </div>

                    <div className="container">
                    <div className="row my-3">
                        <div className="col-12 col-md-5 order-md-2">
                            <img className ="img-fluid shadow bg-white rounded p-1" style={{marginLeft:"auto"}} width="100%" alt="featurette" 
                            src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/557/0955765_PE804101_S4.jpg"/>
                        </div>
                        <div className="col-12 col-md-7 align-items-md-center my-md-auto  order-md-1 mt-3">
                            <p className="h2">HAUGA V.2</p>
                            <p className="h4 text-muted">Mr. DYI | Perabotan</p>
                            <p className="lead text-justify text-md-left">
                            Mudah untuk menyembunyikan kabel dan stopkontak tapi tetap dapat dijangkau dengan jalur kabel di bagian belakang.</p>
                        </div>
                        </div>
                    </div>

                    <div className="container">
                    <div className="row my-3">
                        <div className="col-12 col-md-5 ">
                            <img className ="img-fluid shadow bg-white rounded p-1" style={{marginLeft:"auto"}} width="100%" alt="featurette" 
                            src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/160/0916066_PE784942_S4.jpg"/>
                        </div>
                        <div className="col-12 col-md-7 align-items-md-center my-md-auto mt-3">
                            <p className="h2">IDANÄS</p>
                            <p className="h4 text-muted">IKEA | Rangka tempat tidur</p>
                            <p className="lead text-justify text-md-left">
                            Anda dapat dengan mudah menyedot debu di bawah rangka tempat tidur untuk menjaga ruang tetap bersih dan bebas debu.  Ada banyak ruang di bawah tempat tidur untuk kotak penyimpanan sehingga sempurna untuk menyimpan selimut dan bantal tambahan.  Sisi tempat tidur dapat disesuaikan memungkinkan Anda untuk menggunakan kasur dengan ketebalan yang berbeda.  Veneer kayu memberi Anda tampilan, rasa dan keindahan yang sama seperti kayu solid dengan variasi unik dalam serat, warna, dan tekstur.</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default HomePage;