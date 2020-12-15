import React, { FC } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PaymentRoundedIcon from "@material-ui/icons/PaymentRounded";
import PieChartOutlinedIcon from "@material-ui/icons/PieChartOutlined";
import { Box, Avatar } from "@material-ui/core";
import { Link } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";

const StyledDrawer = withTheme(styled(Drawer)`
  & > div {
    position: relative;
    /* display: flex;
    flex-direction: column; */
    overflow-y: unset;
    max-width: 300px;
    background-color: ${(props) => props.theme.palette.primary.main};

    & > div {
      position: sticky;
      top: 0;
    }
  }
`);

const StyledRow = withTheme(styled("div")`
  display: flex;
  p {
    margin-right: 30px;
  }
`);

const StyledBox = withTheme(styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px;
`);

const StyledAvatar = withTheme(styled(Avatar)`
  width: 100px;
  min-height: 100px;
  margin-bottom: 20px;
`);

const Sidebar: FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <StyledDrawer variant="permanent">
      <div>
        <StyledBox>
          <StyledAvatar sizes="large">H</StyledAvatar>
          <Typography variant="h2" color="textPrimary" align="center">
            Иванов Иван Иванович
          </Typography>
        </StyledBox>
        <Link>
          <Typography variant="body1" color="textSecondary" align="center">
            <CreateIcon />
            Редактировать профиль
          </Typography>
        </Link>
        <div>
          <IconButton onClick={handleDrawerClose}></IconButton>
        </div>
        <List>
          <ListItem button>
            <ListItemText>
              <div>
                <StyledRow>
                  <Typography variant="body2" color="textPrimary" align="left">
                    1000, 45р
                  </Typography>
                  <PaymentRoundedIcon color="secondary" />
                </StyledRow>
                <Typography variant="body1" color="textSecondary" align="left">
                  Счет кредитной карты **34
                </Typography>
              </div>
            </ListItemText>
            <ListItemIcon>
              <PieChartOutlinedIcon />
            </ListItemIcon>
          </ListItem>
        </List>
        <List>
          <ListItem button>
            <ListItemText>
              <div>
                <StyledRow>
                  <Typography variant="body2" color="textPrimary" align="left">
                    1000, 45р
                  </Typography>
                  <PaymentRoundedIcon color="secondary" />
                </StyledRow>
                <Typography variant="body1" color="textSecondary" align="left">
                  Текущий счет **78
                </Typography>
              </div>
            </ListItemText>
            <ListItemIcon>
              <PieChartOutlinedIcon />
            </ListItemIcon>
          </ListItem>
        </List>
        <List>
          <ListItem button>
            <ListItemText>
              <div>
                <StyledRow>
                  <Typography variant="body2" color="textPrimary" align="left">
                    199990, 45р
                  </Typography>
                  <PaymentRoundedIcon color="secondary" />
                </StyledRow>
                <Typography variant="body1" color="textSecondary" align="left">
                  Накопительный счет **77
                </Typography>
              </div>
            </ListItemText>
            <ListItemIcon>
              <PieChartOutlinedIcon />
            </ListItemIcon>
          </ListItem>
        </List>
      </div>
    </StyledDrawer>
  );
};

export default Sidebar;
