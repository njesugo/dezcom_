import { useState, useContext } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { AuthContext } from "../context/AuthContext"; // Assurez-vous que ce chemin est correct
import { useNavigate } from "react-router";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://i.ibb.co/9b5dgCK/bg.jpg") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(""); // Nouveau state pour gérer les erreurs de formulaire
  const { login, isFetching, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    // Réinitialiser le message d'erreur du formulaire
    setFormError("");

    // Vérifier si les champs sont remplis
    if (!username || !password) {
      setFormError("Please fill in both username and password.");
      return;
    }

    // Appel de la méthode login si les champs sont valides
    login(username, password);
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick}>
            LOGIN
          </Button>
          {/* Affichage de l'erreur si les champs ne sont pas remplis */}
          {formError && <Error>{formError}</Error>}
          {/* Afficher l'erreur de login si une erreur survient dans le contexte d'authentification */}
          {error && <Error>Something went wrong...</Error>}
          <Link onClick={handleRegisterClick}>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
