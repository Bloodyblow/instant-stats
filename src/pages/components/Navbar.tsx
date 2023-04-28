import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import BarChart from "@mui/icons-material/BarChart";
import { useRouter } from "next/router";
import { Category } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/app/apiService";
import { CategoryIcon } from "./CategoryIcon";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store/store";
import { setShouldRefreshCategories } from "@/app/store/categorySlice";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const categoriesDropdownSx = {
  transition: "background-color .3s ease-in-out",
  "&:hover": {
    backgroundColor: "#005d68",
  },
};

function Navbar() {
  const { shouldRefetchCategories } = useSelector(
    (state: RootState) => state.category
  );
  const { data: categories, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
  const router = useRouter();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (shouldRefetchCategories) {
      refetch();
      dispatch(setShouldRefreshCategories(false));
    }
  }, [shouldRefetchCategories, refetch, dispatch]);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const appTitle = "Instant stats";

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const isHomePage = router.pathname === "/";

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "primary.main",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop */}
          <BarChart sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              flexGrow: isHomePage ? 1 : 0,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {appTitle}
          </Typography>

          {/* Mobile */}
          {!isHomePage && (
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              {categories && categories?.length > 0 && (
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiList-root": {
                      backgroundColor: "primary.main",
                    },
                  }}
                >
                  <MenuItem disabled key="go-to">
                    Go to chart
                  </MenuItem>
                  {categories.map((category: Category) => (
                    <MenuItem key={category.id} sx={categoriesDropdownSx}>
                      <Typography
                        component="a"
                        href={`/category/${category.id}`}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <CategoryIcon name={category.icon} />
                        <span style={{ marginLeft: ".5rem" }}>
                          {category.name}
                        </span>
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              )}
            </Box>
          )}

          {/* Mobile */}
          <BarChart sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {appTitle}
          </Typography>

          {/* Desktop */}
          {!isHomePage && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <PopupState variant="popover" popupId="go-to-chart-popup-menu">
                {(popupState: any) => (
                  <React.Fragment>
                    <Button
                      variant="text"
                      {...bindTrigger(popupState)}
                      sx={{ color: "text.primary" }}
                    >
                      Go to chart
                    </Button>
                    <Menu
                      {...bindMenu(popupState)}
                      sx={{
                        "& .MuiList-root": {
                          backgroundColor: "primary.main",
                        },
                      }}
                    >
                      {categories?.length &&
                        categories?.length > 0 &&
                        categories.map((category: any) => (
                          <MenuItem key={category.id} sx={categoriesDropdownSx}>
                            <Typography
                              component="a"
                              href={`/category/${category.id}`}
                              sx={{ display: "flex", alignItems: "center" }}
                            >
                              <CategoryIcon name={category.icon} />
                              <span style={{ marginLeft: ".5rem" }}>
                                {category.name}
                              </span>
                            </Typography>
                          </MenuItem>
                        ))}
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            </Box>
          )}

          {/* Desktop & mobile */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
