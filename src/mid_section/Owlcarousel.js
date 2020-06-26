import React,{Component} from 'react';  

import OwlCarousel from 'react-owl-carousel';  

import 'owl.carousel/dist/assets/owl.carousel.css';  

import 'owl.carousel/dist/assets/owl.theme.default.css';  

import './owl.css';  

export class Owlcarousel extends Component {  

        render()  

        {      

          return (  

              <div>  

            <div class='container-fluid' >      

            <div className="row title" style={{marginBottom: "20px"}} >      

            <div class="col-sm-12 btn btn-info">      

            Owl Carousel with Auto Play Property In React Application   

            </div>      

            </div>  

        </div>  

        <div class='container-fluid' >   

          <OwlCarousel items={1} margin={8} autoplay ={true} loop={true}  nav={true}>  
          <div ><img  className="img" src= {'/images/item-1.jpg'}/></div>  

          <div ><img  className="img" src= {'/images/item-2.jpg'}/></div>  

          <div ><img  className="img" src= {'/images/item-5.jpg'}/></div>  
          <div ><img  className="img" src= {'/images/item-6.jpg'}/></div>  

          <div ><img  className="img" src= {'/images/item-7.jpg'}/></div>  

          <div ><img  className="img" src= {'/images/item-8.jpg'}/></div>    

          <div ><img  className="img" src= {'/images/item-1.jpg'}/></div>  

      </OwlCarousel>  

      </div>  

      </div>  

          )  

        }  

      }  

        

  

export default Owlcarousel  