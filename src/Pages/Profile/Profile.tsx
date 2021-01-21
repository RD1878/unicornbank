import React, {
  FC,
  useState,
  useEffect,
  SyntheticEvent,
  ChangeEvent,
} from "react";
import { Container, Typography, Snackbar } from "@material-ui/core";
import PhoneRoundedIcon from "@material-ui/icons/PhoneRounded";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import ListAltRoundedIcon from "@material-ui/icons/ListAltRounded";
import styled from "styled-components";
import { Box, Avatar } from "@material-ui/core";
import AddAPhotoRoundedIcon from "@material-ui/icons/AddAPhotoRounded";
import { PrimaryButton, TextField } from "../../atoms";
import { useSelector } from "react-redux";
import { userSelector } from "../../selectors/userSelector";
import { db, firebaseAuth } from "../../firebase/firebase";
import { saveUser } from "../../actions/user";
import { readUserData } from "./../../firebase/firebase";
import { useDispatch } from "react-redux";
import { Alert } from "@material-ui/lab";

export type TAlert = "success" | "error";

const StyledRow = styled("div")`
  display: flex;
  align-items: center;
  margin-top: 50px;

  p {
    margin-left: 5px;
  }

  h2 {
    margin-left: 30px;
  }

  svg {
    margin-right: 25px;
  }

  input {
    width: 100%;
  }
`;

const StyledAvatar = styled(Avatar)`
  width: 100px;
  min-height: 100px;
  margin-bottom: 20px;
`;

const StyledBox = styled(Box)`
  p {
    margin-bottom: 60px;
  }
  max-width: 496px;
  margin-top: 40px;
  margin-bottom: 80px;
`;

const Profile: FC = () => {
  const { passport, snils, contact } = useSelector(userSelector);
  const [phone, setPhone] = useState(contact.phone);
  const [email, setEmail] = useState(contact.email);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertType, setAlertType] = useState<TAlert>("success");
  const dispatch = useDispatch();

  useEffect(() => {
    setPhone(contact.phone);
    setEmail(contact.email);
  }, [contact]);

  const handleCloseAlert = (event?: SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") return;
    setIsOpenAlert(false);
  };

  const changeContactInfo = async (): Promise<void> => {
    try {
      const uid = firebaseAuth?.currentUser?.uid;

      if (!uid) {
        throw new Error("Пользователь не найден");
      }

      db.ref().update({
        [`users/${uid}`]: {
          contact: {
            phone,
            email,
          },
        },
      });
      const updatedContactInfo = await readUserData(uid);
      dispatch(saveUser(updatedContactInfo));
      setAlertType("success");
    } catch (error) {
      setErrorMessage(error.message);
      setAlertType("error");
    } finally {
      setIsOpenAlert(true);
    }
  };

  const changePhone = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h1" color="textPrimary">
          Профиль
        </Typography>
        <Box mt={6}>
          <Typography variant="h2" color="textPrimary">
            Контакты
          </Typography>
          <StyledRow>
            <PhoneRoundedIcon color="action" fontSize="large" />
            <TextField label="Телефон" value={phone} onChange={changePhone} />
          </StyledRow>
          <StyledRow>
            <EmailRoundedIcon color="action" fontSize="large" />
            <TextField label="Email" value={email} onChange={changeEmail} />
          </StyledRow>
        </Box>
        <Box mt={10}>
          <Typography variant="h2" color="textPrimary">
            Документы
          </Typography>
          <StyledRow>
            <ListAltRoundedIcon color="action" fontSize="large" />
            <TextField label="Паспорт" disabled defaultValue={passport} />
          </StyledRow>
          <StyledRow>
            <ListAltRoundedIcon color="action" fontSize="large" />
            <TextField label="СНИЛС" disabled defaultValue={snils} />
          </StyledRow>
        </Box>
        <StyledRow>
          <StyledAvatar sizes="large">H</StyledAvatar>
          <StyledRow>
            <AddAPhotoRoundedIcon color="action" />
            <Typography variant="body2" color="textSecondary">
              Загрузить фото
            </Typography>
          </StyledRow>
        </StyledRow>
        <StyledBox>
          <Typography variant="body2" color="textSecondary">
            Если у вас поменялось ФИО, обратитесь в отделение банка. Для
            изменения других данных Вы можете обратиться в чат.
          </Typography>
          <PrimaryButton size="large" onClick={changeContactInfo}>
            Сохранить изменения
          </PrimaryButton>
        </StyledBox>
        <Snackbar
          open={isOpenAlert}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
        >
          <Alert severity={alertType} onClose={handleCloseAlert}>
            {alertType === "success"
              ? "Данные успешно изменены!"
              : errorMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default Profile;
