import { useState, useContext } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { AuthContext } from "../context/AuthContext"; // Importer le contexte AuthContext
import { useNavigate } from "react-router-dom"; // Importer useNavigate

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://i.ibb.co/CJsnyFW/bg-register.jpg") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
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
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState(""); // State pour gérer les erreurs de validation

  const { register, isFetching, error } = useContext(AuthContext); // Utiliser le contexte
  const navigate = useNavigate(); // Initialize useNavigate

  // Validation de l'email avec RegEx
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegisterClick = async (e) => {
    e.preventDefault();

    // Réinitialiser le message d'erreur du formulaire
    setFormError("");

    // Vérifier que tous les champs sont remplis
    if (!name || !lastName || !username || !email || !password || !confirmPassword) {
      setFormError("All fields are required.");
      return;
    }

    // Vérifier que l'email est valide
    if (!validateEmail(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    // Vérifier que les mots de passe correspondent
    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    // Si toutes les validations sont passées, procéder à l'enregistrement
    try {
      await register({
        name,
        lastName,
        username,
        email,
        password,
      });
      navigate("/login"); // Rediriger vers la page de connexion après un enregistrement réussi
    } catch (err) {
      console.error(err); // Gérer les erreurs ici si nécessaire
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="name" onChange={(e) => setName(e.target.value)} />
          <Input placeholder="last name" onChange={(e) => setLastName(e.target.value)} />
          <Input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
          <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="confirm password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal data in
            accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleRegisterClick} disabled={isFetching}>
            CREATE
          </Button>
          {/* Affichage des erreurs de validation */}
          {formError && <Error>{formError}</Error>}
          {/* Affichage de l'erreur de contexte si elle existe */}
          {error && <Error>Something went wrong...</Error>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
