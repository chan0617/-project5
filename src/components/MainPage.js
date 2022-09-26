import React from "react";
import "./MainPage.css";
import axios from "axios";
import { useEffect } from "react";

const MainPage = () => {
  let [products, setProducts] = React.useState([]); //컴포넌트의 상태를 바꿀 수 있는 함수:useState
  //products를 setProducts 바꿔주는 역활.

  useEffect(() => {
    //콜백함수:useEffect 한번만 실행되도록 되어있다.[]넣어주면 렌더되자마자 더이상 실행하지 않음
    axios
      .get("https://8e56dfb9-e6a0-47bb-ac79-7facafb276ea.mock.pstmn.io/produts")
      .then((res) => {
        products = res.data.products; //products에 내용저장 //기존의 값을 버리고 상태값이 바뀜
        setProducts(products); //통신완료를 하면 값을 바꿔
      })
      .catch((err) => {
        return console.log(err);
      });
  }, []);
  return (
    <>
      <div id="header">
        <img src="images/icons/logo.png" alt="logo" />
      </div>
      <div id="body">
        <div id="banner">
          <img src="images/banners/banner1.png" alt="banner" />
        </div>
        <h2>Products</h2>
        <div id="product-list">
          {products.map((product, idx) => {
            {/* 원소들을 배열하는 함수: map 각각 배열요소들의 키가 필요하다. 
            고유의 요소에 키를 붙여라 최상의요소에 붙여줌*/}
            // console.log(products, product, idx);
            return (
              <div className="product-card" key={idx}>
                {/* 중복되지않는 값을 키로 사용해야한다 */}
                <div>
                  <img className="product-img" src={product.imageUrl} alt="{product.name}" />
                </div>
                <div className="product-content">
                  <span className="product-name">{product.name}</span>
                  
                  <span className="product-price"><img className="product-avatar" src="images/icons/avatar.png" alt="{product.name}" />{product.price}</span>
                  <div className="product-seller">
                    <span>wanna</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div id="footer">
        <a href="#">회사소개</a>
        <a href="#">이용약관</a>
        <a href="#">통신판매업:123-1234</a>
        <a href="#">사업자등록번호:456-56-78951</a>
        <a href="#">개인정보...</a>
      </div>{" "}
    </>
  );
};
export default MainPage;
