import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Typography, Box } from "@mui/material";
import { lockBodyScroll, unlockBodyScroll } from "../../utility/commonUtility";
import { Close as CloseIcon } from "@mui/icons-material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();
const styles = (theme: any) => ({
  root: {
    position: "fixed",
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1200,
    transitionProperty: "all",
    transitionDuration: ".5s",
    transitionTimingFunction: "cubic-bezier(0, 1, 0.5, 1)",
  },
  modalClose: {
    top: "100%",
  },
  modalOpen: {
    top: 0,
  },
  transparentSection: {
    height: "25%",
    background: `#00000870 !important`,
  },
  detailSection: {
    height: "75%",
    padding: "25px",
    background: theme.palette.common.white,
    overflowY: "scroll",
  },
  header: {
    height: 30,
  },
  close: {
    float: "right",
    padding: "0px 21px",
    cursor: "pointer",
  },
  titleClass: {
    float: "left",
  },
  iconClass: {
    marginLeft: 22,
  },
  title: {
    textAlign: "left",
    letterSpacing: 0,
    color: "grey",
    opacity: 1,
    marginLeft: theme.spacing(2),
  },
});

export const ModalComponent = ({
  onCloseAction,
  children,
  transparentClassName = "",
  detailClassName = "",
  isOpen = false,
  modalTitle = "",
  titleIcon = null,
}: any) => {
  const classes = styles(theme);
  const [isModalOpen, setModalClass] = useState(isOpen);
  const onClickAction = (e: any) => {
    setModalClass(false);
    onCloseAction && onCloseAction(e);
  };
  useEffect(() => {
    if (!isOpen) {
      lockBodyScroll();
      setModalClass(isOpen);
      onCloseAction && onCloseAction();
    } else {
      unlockBodyScroll();
      setTimeout(() => {
        setModalClass(isOpen);
      }, 500);
    }
  }, [isOpen]);
  return (
    <Box
      sx={[classes.root, isModalOpen ? classes.modalOpen : classes.modalClose]}
    >
      <Box sx={{ transparent: "rgba(61, 39, 84, 1)" }} />
      <Box className={`${classes.detailSection} ${detailClassName}`}>
        <Box sx={classes.header}>
          {modalTitle ? (
            <Box sx={classes.titleClass}>
              <Typography
                variant="h5"
                sx={classes.title}
                display="inline"
                gutterBottom
              >
                {modalTitle}
              </Typography>
            </Box>
          ) : null}
          <Box sx={classes.close} onClick={onClickAction}>
            <CloseIcon />
          </Box>
        </Box>
        {children}
      </Box>
    </Box>
  );
};

ModalComponent.propTypes = {
  children: PropTypes.any,
  classes: PropTypes.object,
  detailClassName: PropTypes.string,
  isOpen: PropTypes.bool,
  modalTitle: PropTypes.string,
  onCloseAction: PropTypes.func,
  titleIcon: PropTypes.string,
  transparentClassName: PropTypes.string,
};

ModalComponent.defaultProps = {
  children: null,
  detailClassName: "",
  isOpen: false,
  modalTitle: "",
  onCloseAction: null,
  titleIcon: "",
  transparentClassName: "",
};
