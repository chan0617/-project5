import { API_URL } from "../config/constants";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./ProductPage.css";

const ProductPage = () => {
  const { id } = useParams();
  let navi = useNavigate();
  let [product, setProduct] = useState(null);
  //(null)적거나 (' ') 같은거다.
  useEffect(() => {
    axios
      // 상품db정보
      .get(`${API_URL}/products/${id}`)
      .then((res) => {
        //console.log(res)
        product = res.data.product;
        setProduct(product);
        console.log(res);
      })
      .catch((err) => {
        return console.log(err);
      });
  }, []);

  if (product === null) {
    return <h1>작품정보를 받고있습니다.</h1>;
  }

  return (
    <>
      <button onClick={() => navi(-1)}>이전화면</button>
      <div id="image-box">
        <img src={`${API_URL}/${product.imageUrl}`} alt={product.name} />
      </div>
      <div id="profile-box">
        <img src={`${API_URL}/${product.imageUrl}`} alt={product.seller} />
        <span className="product-seller">{product.seller}</span>
      </div>
      <div id="content-box">
        <div id="name">{product.name}</div>
        <div id="price">{product.price}</div>
        <div id="createat">{product.createdAt}</div>
        <div id="desc">{product.description}</div>
      </div>
    </>
  );
};
export default ProductPage;

// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// const ProductPage = () => {
//   const { id } = useParams();

//   // 형태가 2가지. import에 작성한대로 적으면 됨. React를 적거나 / 적지 않거나 (적은 형태는 MainPage.js)
//   let [product, setProduct] = useState(null);

//   // useEffect:콜백함수. 의존성 배열임. []라고 적으면 한 번만 실행, []안에 내용을 적으면 콜백
//   useEffect(() => {
//     axios
//       .get(`https://044fbdc6-5eb3-40c1-976f-426f5cde36f7.mock.pstmn.io/products/${id}`)

//       // 통신(get) 성공했을 경우
//       .then((res) => {
//         product = res.data;
//         setProduct(product);
//         console.log(res);
//       })
//       //실패했을 경우
//       .catch((err) => {});
//   }, []);

//   if (product === null) {
//     return <h1>상품정보를 받고 있습니다.</h1>;
//   }

//   return (
//     <>
//       {/* <h1>선택하신 상품은 {id}번 상품입니다.</h1> */}
//       <div id="image-box">
//         <img src={`/${product.imageUrl}`} alt="" />
//       </div>
//     </>
//   );
// };
// export default ProductPage;
