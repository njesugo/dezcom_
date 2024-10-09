// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useCart } from "../context"; // Importer le hook du contexte

const Container = styled.div`
  height: 60px;
  /* Autres styles */
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 20px;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  cursor: pointer;
`;

const Center = styled.div`
  flex: 1;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  margin-left: 25px;
  cursor: pointer;
`;

const Navbar = () => {
  const { state } = useCart(); // Accéder à l'état du panier via le contexte

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/">
            <Logo>MyStore</Logo>
          </Link>
        </Left>
        <Center>
          {/* Vous pouvez ajouter des liens de navigation ici */}
        </Center>
        <Right>
          <MenuItem>
            <Link to="/cart">
              Cart ({state.quantity}) {/* Afficher la quantité d'articles dans le panier */}
            </Link>
          </MenuItem>
          <MenuItem>
            <Link to="/login">Login</Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
