import React, { FC, useState } from "react";
import { Container, Typography } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";
import PhoneRoundedIcon from "@material-ui/icons/PhoneRounded";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import ListAltRoundedIcon from "@material-ui/icons/ListAltRounded";
import styled from "styled-components";
import { Box, Avatar, Link } from "@material-ui/core";
import AddAPhotoRoundedIcon from "@material-ui/icons/AddAPhotoRounded";
import { PrimaryButton, TextField } from "../../atoms";

interface IProfileDocs {
  [x: string]: string | number;
}

const PROFILE = {
  phone: "89085****",
  email: "user@****",
  passport: "** ** 8989",
  snils: "439884-2848794-2847947- 32",
};

const StyledRow = withTheme(styled("div")`
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
`);

const StyledAvatar = withTheme(styled(Avatar)`
  width: 100px;
  min-height: 100px;
  margin-bottom: 20px;
`);

const StyledBox = withTheme(styled(Box)`
  p {
    margin-bottom: 60px;
  }
  max-width: 496px;
  margin-top: 40px;
  margin-bottom: 80px;
`);

const Profile: FC = () => {
  const [data, setData] = useState<IProfileDocs>(PROFILE);

  return (
    <Container>
      <Box my={6}>
        <Typography variant="h1" color="textPrimary">
          Профиль
        </Typography>
        <StyledRow>
          <PhoneRoundedIcon color="action" fontSize="large" />
          <TextField label="Телефон" focused defaultValue={data.phone} />
        </StyledRow>
        <StyledRow>
          <EmailRoundedIcon color="action" fontSize="large" />
          <TextField label="Email" focused defaultValue={data.email} />
        </StyledRow>
      </Box>
      <Box mt={10}>
        <Typography variant="h1" color="textPrimary">
          Документы
        </Typography>
        <StyledRow>
          <ListAltRoundedIcon color="action" fontSize="large" />
          <TextField label="Паспорт" disabled defaultValue={data.passport} />
        </StyledRow>
        <StyledRow>
          <ListAltRoundedIcon color="action" fontSize="large" />
          <TextField label="СНИЛС" disabled defaultValue={data.snils} />
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
          Если у вас поменялось ФИО, обратитесь в отделение банка. Для изменения
          других данных Вы можете обратиться в чат.
        </Typography>
        <PrimaryButton size="large">Сохранить изменения </PrimaryButton>
      </StyledBox>
    </Container>
  );
};

export default Profile;
