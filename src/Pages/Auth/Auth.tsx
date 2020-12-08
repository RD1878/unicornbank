import React, { FC } from "react";
import styled from "styled-components";
import backGround from "../../assets/images/1-2.png";
import logo from "../../assets/images/logo.png";
import PasswordField from "../../atoms/PasswordField";
import PrimaryButton from "../../atoms/PrimaryButton";
import TextField from "../../atoms/TextField";
import { COLORS } from "../../theme";

const BackGround = styled.div`
  background-image: url(${backGround});
  min-height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.div`
  background-image: url(${logo});
  background-repeat: no-repeat;
  width: 130px;
  height: 60px;
  position: absolute;
  top: 0;
  left: 3%;
`;

const FormAuth = styled.div`
  background-color: ${COLORS.DARK_BLUE_05};
  border-radius: 2rem;
  display: flex;
  min-width: 35vw;
  padding-top: 2rem;
  padding-bottom: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div {
    justify-content: center;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;

    & > div {
      margin-bottom: 2em;
      width: 100%;
    }
  }
`;

const Title = styled.div`
  color: ${COLORS.WHITE};
  text-align: center;
  line-height: 2rem;
  font-size: 2rem;
`;

const Auth: FC = () => {
  return (
    <BackGround>
      <Logo></Logo>
      <FormAuth>
        <div>
          <Title>Вход в личный кабинет</Title>
          <div>
            <TextField label="Почта" />
          </div>
          <PasswordField />
          <PrimaryButton>Войти</PrimaryButton>
        </div>
      </FormAuth>
    </BackGround>
  );
};

export default Auth;

// import React, { useEffect, useState } from "react";
// import "./App.css";
// import styled from "styled-components";
// import firebase from "firebase/app";
// import "firebase/database";
// import "firebase/auth";

// const Form = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 600px;
//   margin: 60px auto;
// `;

// const App: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [hasAccount, setHasAccount] = useState(false);
//   const [name, setName] = useState("");
//   const [key, setKey] = useState("");
//   const [keyValue, setKeyValue] = useState("");

//   useEffect(() => {
//     const db = firebase.database();
//     // const name = db.ref("name"); //получаем имя из БД и заносим его в стейт
//     // name.on("value", (elem) => setName(elem.val()));
//     // console.log(name);
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { value, id } = e.target;

//     if (id === "email") {
//       setEmail(value);
//     }
//     if (id === "password") {
//       setPassword(value);
//     }
//     if (id === "key") {
//       setKey(value);
//     }
//     if (id === "keyValue") {
//       setKeyValue(value);
//     }
//   };

//   const createAccount = (): void => {
//     // firebase
//     //   .auth()
//     //   .createUserWithEmailAndPassword(email, password) //создание аккаунта
//     //   .catch(({ message }) => console.error(message));

//     firebase
//       .auth()
//       .signInWithEmailAndPassword(email, password) //войти с помощью почты и пароля
//       .then(() => setHasAccount(true))
//       .catch(({ message }) => console.error(message));
//   };

//   const sendData = () => {
//     const db = firebase.database();
//     db.ref(key).push(keyValue);
//     alert("записалось");
//   };

//   if (hasAccount) {
//     return (
//       <div>
//         <input type="text" placeholder="key" id="key" onChange={handleChange} />
//         <input
//           type="text"
//           placeholder="value"
//           id="keyValue"
//           onChange={handleChange}
//         />
//         <button type="button" onClick={sendData}>
//           Отравить
//         </button>
//       </div>
//     );
//   }

//   return (
//     <Form>
//       <input type="text" id="email" onChange={handleChange} />
//       <input type="password" id="password" onChange={handleChange} />
//       <button type="button" onClick={createAccount}>
//         Войти
//       </button>
//     </Form>
//   );
// };
