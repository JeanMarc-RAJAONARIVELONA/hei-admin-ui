import {Box, Drawer, Typography, useMediaQuery} from "@mui/material";
import {
  AccountCircle,
  Logout,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import {HaMenuContent} from "../HaMenuContent";
import {SingleMenu} from "./SingleMenu";
import {useSidebarState} from "react-admin";
import authProvider from "../../../../providers/authProvider";
import {useRole} from "../../../../security/hooks";
import {PALETTE_COLORS} from "../../../constants/palette";
import menuLogo from "../../../../assets/menu-logo.png";
import {styled} from "@mui/styles";

//TODO: create hook useIsSmall

const MENU_STYLE = {
  width: "250px",
  boxSizing: "border-box",
  paddingLeft: "20px",
  zIndex: 9999,
  transition: "all .3s linear",
  overflowX: "hidden",
  bgcolor: "#001948",
  color: PALETTE_COLORS.white,
  top: 60,
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
};

const Separator = styled("div")({
  backgroundColor: "rgba(255,255,255,.2)",
  height: 1,
  display: "block",
  width: "300%",
  transform: "translateX(-50%)",
});

export function HaMenuBase({sx = {}}) {
  const [open] = useSidebarState();
  const isSmall = useMediaQuery("(max-width:920px)");
  const role = useRole();

  const logout = async () => {
    await authProvider.logout();
    window.location.reload();
  };
  const isShown = !isSmall || open;

  return (
    <Box
      sx={{
        ...MENU_STYLE,
        left: isShown ? 0 : "-250px",
        height: isSmall ? "100%" : "calc(100% - 60px)",
        ...sx,
      }}
      component="div"
      id="ha-menu"
    >
      <Box sx={{width: "100%"}}>
        {isSmall && (
          <>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                py: 2.5,
                gap: 2,
              }}
            >
              <img alt="hei" src={menuLogo} style={{width: 40, height: 27}} />
              <Typography
                variant="h1"
                sx={{
                  fontSize: "1.1em",
                  color: PALETTE_COLORS.white,
                  fontWeight: 400,
                }}
              >
                HEI Admin
              </Typography>
            </Box>
            <Separator />
          </>
        )}
        <SingleMenu
          label="Profil"
          to="/profile"
          icon={<AccountCircle />}
          sx={{mt: 3}}
        />
        <HaMenuContent />
      </Box>
      <Box sx={{width: "100%"}}>
        {role.isManager() && (
          <SingleMenu
            label="Frais prédéfinis"
            to="/fees-templates"
            icon={<SettingsIcon />}
          />
        )}
        <SingleMenu label="Se déconnecter" icon={<Logout />} onClick={logout} />
      </Box>
    </Box>
  );
}

export function HaMenu() {
  const isSmall = useMediaQuery("(max-width:920px)");
  const [open, setOpen] = useSidebarState();

  return isSmall ? (
    <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
      <HaMenuBase />
    </Drawer>
  ) : (
    <HaMenuBase sx={{position: "fixed"}} />
  );
}
