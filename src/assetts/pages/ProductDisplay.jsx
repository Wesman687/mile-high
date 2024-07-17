import React, { useContext, useEffect, useState } from "react";
import "./ProductDisplay.css";
import { useParams } from "react-router-dom";
import { Context } from "../../context/ContextProvider";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const ProductDisplay = ({ flowerArray }) => {
  const [amount, setAmount] = useState(0);
  const [strain, setStrain] = useState("Required");
  const [option, setOption] = useState("")

  function increaseAmount(){
    setAmount(amount+1)
  }
  function decreaseAmount(){
    if (amount > 0)
    setAmount(amount-1)
  }
  let id = useParams();
  id = id.index;
  const strains = flowerArray[id].strain;
  const thumb = flowerArray[id].thumb;
  const { loading } = useContext(Context);
  console.log(thumb);

  return (<div className="row">
    
      {loading ? (
        <div className="loading"></div>
      ) : (
        <div className="pd__container">
        <div className="picture__options">
          <div className="pd__wrapper">
            <img src={flowerArray[id].image} alt="" className="pd__image" />
            <div className="pd__info">
              <h1 className="pd__title">{flowerArray[id].title}</h1>
              <h2 className="pd__strain--req">Strain: <span className="red">{strain}</span></h2>
              <div className="pd__strain--wrapper">
                {strains.map((curr, index) => (
                  <button key={index} onClick={(event)=>setStrain(event.target.value)} value={curr} className="pd__strain click">
                    {curr}
                  </button>
                ))}
              </div>
              <select
                defaultValue="28"
                className="pd__options"
                name=""
                id="size"
                onChange={(event)=>setOption(event.target.value)}
              >
                <option value="">Choose Options</option>
                <option value="28" data-default>
                  Ounce
                </option>
                <option value="14">Half Ounce</option>
                <option value="7">Quarter</option>
              </select>
              <div className="amount">
                <span className="amount__text">Quantity:</span>
                <button onClick={()=>decreaseAmount()} className="down click">-</button>
                <form type="number" min={0} max={99} value={amount} className="amount__field">
                {amount}
                </form>
                <button onClick={()=>increaseAmount()} className="up click">+</button>
              </div>
              <button className="checkout click">Add to Cart</button>
            </div>
          </div>
          <h1 className="pd__desc">{flowerArray[id].desc}</h1>
          </div>
          <div className="pd__thumb--window">
            {thumb.map((curr, index) => (
              <figure className="thumb__figure">
                <img src={curr} alt="" key={index} className="thumb__image" />
              </figure>
            ))}
          
        </div>
        </div>
      )}
    </div>
  );
};

export default ProductDisplay;
