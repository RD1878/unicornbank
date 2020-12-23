import React, { FC, useEffect, useState } from "react";
import { Container, Typography } from "@material-ui/core";
import PhoneRoundedIcon from "@material-ui/icons/PhoneRounded";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import ListAltRoundedIcon from "@material-ui/icons/ListAltRounded";
import styled from "styled-components";
import { Box, Avatar } from "@material-ui/core";
import AddAPhotoRoundedIcon from "@material-ui/icons/AddAPhotoRounded";
import { PrimaryButton, TextField } from "../../atoms";
import { db } from "../../firebase/firebase";
import LinearProgress from "@material-ui/core/LinearProgress";

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
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [passport, setPassport] = useState("");
  const [snils, setSnils] = useState("");
  const [loading, setLoading] = useState(true);

  const getContactInfo = () => {
    db.ref("users/0")
      .once("value")
      .then((response) => {
        const data = response.val();

        setPhone(data.contact.phone);
        setEmail(data.contact.email);
        setSnils(data.snils);
        setPassport(data.passport);
        setLoading(false);
      });
  };

  useEffect(() => {
    getContactInfo();
  }, []);

  if (loading) {
    return (
      <Container>
        <LinearProgress />
      </Container>
    );
  }

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
            <TextField label="Телефон" focused defaultValue={phone} />;
          </StyledRow>
          <StyledRow>
            <EmailRoundedIcon color="action" fontSize="large" />
            <TextField label="Email" focused defaultValue={email} />
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
          <PrimaryButton size="large">Сохранить изменения </PrimaryButton>
        </StyledBox>
      </Box>
    </Container>
  );
};

export default Profile;
