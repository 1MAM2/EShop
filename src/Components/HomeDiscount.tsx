import Product from "./Product";
import type { ProductReadDTO } from "../types/ProductTypes/PrdocutReadDTO";


type HomeDiscountProduct ={
  props:ProductReadDTO[];
}


const HomeDiscount = ({props}:HomeDiscountProduct) => {  
  return (
    <div className="text-center homeDiscount my-10 py-10 rounded-2xl sm:px-10 md:px-20 lg:px-40">
      <h3 className="inline underline text-indigo-700 text-6xl font-bold text-center px-2.5">
        Don't Miss These!
      </h3>
      <div className="listProduct grid xl:grid-cols-4 md:grid-cols-3 sm:gap-3 sm:grid-cols-2 gap-6 place-items-center">
       {
        props.map((item:ProductReadDTO)=>(
           <Product key={item.Id} props={item} />
        ))
       
       }
       {
         props.map((item:ProductReadDTO)=>(
           <Product key={item.Id} props={item} />
        ))
       }
        {
         props.map((item:ProductReadDTO)=>(
           <Product key={item.Id} props={item} />
        ))
       }
           
      </div>
    </div>
  );
};

export default HomeDiscount;
