import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const OrderContainer = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductImage = styled.img`
  width: 120px;
  height: 100px;
  object-fit: contain;
  margin-right: 20px;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductTitle = styled.h3`
  margin: 0;
`;

const ProductDesc = styled.p`
  margin: 5px 0;
  font-size: 14px;
  color: #555;
`;

const ProductInfo = styled.div`
  margin: 5px 0;
`;

const TotalAmount = styled.p`
  font-weight: bold;
  font-size: 18px;
  text-align: right;
  margin-top: 20px;
`;

const Order = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <Title>Your Orders</Title>
      {products.length > 0 ? (
        products.map((product) => (
          <OrderContainer key={product._id}>
            <ProductContainer>
              <ProductImage src={product.img} alt={product.title} />
              <ProductDetails>
                <ProductTitle>{product.title}</ProductTitle>
                <ProductDesc>{product.desc}</ProductDesc>
                <ProductInfo>
                  <strong>Price:</strong> ${product.price}
                </ProductInfo>
                <ProductInfo>
                  <strong>Categories:</strong> {product.categories.join(", ")}
                </ProductInfo>
                <ProductInfo>
                  <strong>Size:</strong> {product.size.join(", ")}
                </ProductInfo>
                <ProductInfo>
                  <strong>Color:</strong> {product.color.join(", ")}
                </ProductInfo>
              </ProductDetails>
            </ProductContainer>
          </OrderContainer>
        ))
      ) : (
        <div>No products found.</div>
      )}
    </Container>
  );
};

export default Order;
