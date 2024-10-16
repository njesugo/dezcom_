// src/components/Navbar.js
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useCart } from "../context"; // Importer le hook du contexte
import { AuthContext } from "../context/AuthContext"; // Importer le contexte AuthContext

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
  const { user, logout } = useContext(AuthContext); // Accéder à l'état d'authentification
  const navigate = useNavigate(); // Initialiser useNavigate
  
  const handleLogout = () => {
    logout(); // Appeler la fonction de déconnexion
    navigate("/"); // Rediriger vers la page d'accueil
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Link to="/">
            <Logo>DEZCOM</Logo>
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
          {user ? ( // Vérifier si l'utilisateur est connecté
            <MenuItem onClick={logout}>
              Logout
            </MenuItem>
          ) : (
            <MenuItem>
              <Link to="/login">Login</Link>
            </MenuItem>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
