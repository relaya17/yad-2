import {
  AppBar,
  Box,
  Container,
  Link as MuiLink,
  Stack,
  Toolbar,
  Typography,
  Button,
  Divider,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  SvgIcon,
  useMediaQuery,
} from '@mui/material';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useMemo, useState } from 'react';

const linkSx = {
  textDecoration: 'none',
  color: 'inherit',
  fontWeight: 800,
  opacity: 0.9,
  letterSpacing: 0.2,
  '&.active': {
    opacity: 1,
    textDecoration: 'underline',
    textUnderlineOffset: '6px',
    textDecorationThickness: '2px',
  },
};

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  // Use NavLink render-prop to avoid passing a function into MUI's `className` prop (PropTypes warning).
  return (
    <NavLink to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
      {({ isActive }) => {
        const activeSx = isActive ? linkSx['&.active'] : null;
        return (
          <MuiLink component="span" sx={{ ...linkSx, ...(activeSx ?? {}) }}>
            {children}
          </MuiLink>
        );
      }}
    </NavLink>
  );
}

function HamburgerIcon() {
  return (
    <SvgIcon viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6.5h16a1 1 0 0 0 0-2H4a1 1 0 0 0 0 2zm16 4H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2zm0 6H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2z" />
    </SvgIcon>
  );
}

export function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isMobile = useMediaQuery('(max-width:899px)');
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const menuOpen = Boolean(menuAnchor);

  const bg = useMemo(() => (isHome ? 'linear-gradient(180deg,#FAFAFC 0%, #EEF2FF 60%, #FAFAFC 100%)' : 'background.default'), [isHome]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: bg }}>
      <a className="skip-link" href="#main">
        דלג לתוכן
      </a>

      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: '#475569',
          color: '#fff',
          borderBottom: '1px solid #334155',
          boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)',
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Toolbar sx={{ px: 0, py: { xs: 1, sm: 1.2 }, gap: { xs: 1, sm: 2 }, minHeight: { xs: 56, sm: 64 } }}>
            <Stack direction="row" alignItems="center" gap={1.5} sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                component={Link}
                to="/"
                variant="h6"
                className="brand-title"
                sx={{
                  fontFamily: "'Inter', 'Rubik', system-ui, -apple-system, sans-serif",
                  fontWeight: 900,
                  textDecoration: 'none',
                  color: '#FFFFFF',
                  whiteSpace: 'nowrap',
                  letterSpacing: { xs: -0.3, sm: -0.5 },
                  fontSize: { xs: 17, sm: 22 },
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #E0E7FF 50%, #FFFFFF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 2px 8px rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    filter: 'brightness(1.1)',
                  },
                }}
              >
                Tishal Et Dudu
              </Typography>
            </Stack>

            {isMobile ? (
              <>
                <IconButton
                  aria-label="פתח תפריט"
                  aria-controls={menuOpen ? 'nav-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={menuOpen ? 'true' : undefined}
                  onClick={(e) => setMenuAnchor(e.currentTarget)}
                >
                  <HamburgerIcon />
                </IconButton>
                <Menu
                  id="nav-menu"
                  anchorEl={menuAnchor}
                  open={menuOpen}
                  onClose={() => setMenuAnchor(null)}
                  MenuListProps={{ 'aria-label': 'ניווט' }}
                >
                  <MenuItem component={Link} to="/deals" onClick={() => setMenuAnchor(null)}>
                    למכירה
                  </MenuItem>
                  <MenuItem component={Link} to="/free" onClick={() => setMenuAnchor(null)}>
                    למסירה
                  </MenuItem>
                  <MenuItem component={Link} to="/about" onClick={() => setMenuAnchor(null)}>
                    אודות
                  </MenuItem>
                  <MenuItem component={Link} to="/terms" onClick={() => setMenuAnchor(null)}>
                    תנאי שימוש
                  </MenuItem>
                  <MenuItem component={Link} to="/privacy" onClick={() => setMenuAnchor(null)}>
                    מדיניות פרטיות
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Stack
                direction="row"
                gap={{ xs: 2, sm: 3 }}
                alignItems="center"
                sx={{ fontSize: { xs: 12, sm: 14 }, flexWrap: 'wrap' }}
              >
                <NavItem to="/deals">למכירה</NavItem>
                <NavItem to="/free">למסירה</NavItem>
                <NavItem to="/about">אודות</NavItem>
                <NavItem to="/terms">תנאי שימוש</NavItem>
                <NavItem to="/privacy">מדיניות פרטיות</NavItem>
                <Button
                  component={Link}
                  to="/publish"
                  variant="contained"
                  size="small"
                  sx={{
                    bgcolor: '#FACC15',
                    color: '#111827',
                    fontWeight: 900,
                    px: { xs: 2, sm: 2.5 },
                    fontSize: { xs: 11, sm: 14 },
                    '&:hover': { bgcolor: '#EAB308' },
                  }}
                >
                  פרסם עכשיו
                </Button>
              </Stack>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Container
        id="main"
        component="main"
        maxWidth="lg"
        sx={{
          pt: isHome ? { xs: 0.5, sm: 0.8 } : { xs: 2, sm: 3 },
          pb: { xs: 2, sm: 3 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <Outlet />
      </Container>

      <Divider sx={{ mt: 6 }} />
      <Box
        component="footer"
        sx={{
          py: { xs: 1.5, sm: 2 },
          mt: 'auto',
          bgcolor: '#475569',
          borderTop: '1px solid #334155',
          color: '#FFFFFF',
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Stack gap={{ xs: 1, sm: 1.5 }} alignItems="center">
            {/* שם האתר באמצע */}
            <Typography
              className="brand-title"
              sx={{
                fontFamily: "'Inter', 'Rubik', system-ui, -apple-system, sans-serif",
                fontWeight: 900,
                fontSize: { xs: 19, sm: 22 },
                color: '#FFFFFF',
                textAlign: 'center',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #E0E7FF 50%, #FFFFFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 2px 8px rgba(255, 255, 255, 0.2)',
                letterSpacing: -0.3,
              }}
            >
              תשאל את דודו
            </Typography>

            {/* קישורים - מסודרים בשורה */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              gap={{ xs: 1, sm: 2, md: 2.5 }}
              alignItems={{ xs: 'center', sm: 'flex-start' }}
              justifyContent="center"
              flexWrap="wrap"
            >
              <Stack gap={0.4} alignItems={{ xs: 'center', sm: 'flex-start' }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: 12, sm: 13 },
                    color: '#FFFFFF',
                    textAlign: { xs: 'center', sm: 'left' },
                  }}
                >
                  משפטי
                </Typography>
                <Stack gap={0.2} alignItems={{ xs: 'center', sm: 'flex-start' }}>
                  <MuiLink
                    component={Link}
                    to="/about"
                    underline="hover"
                    color="#E5E7EB"
                    sx={{
                      fontSize: { xs: 12, sm: 13 },
                      textAlign: { xs: 'center', sm: 'left' },
                      '&:hover': { color: '#FFFFFF' },
                    }}
                  >
                    אודות
                  </MuiLink>
                  <MuiLink
                    component={Link}
                    to="/terms"
                    underline="hover"
                    color="#E5E7EB"
                    sx={{
                      fontSize: { xs: 12, sm: 13 },
                      textAlign: { xs: 'center', sm: 'left' },
                      '&:hover': { color: '#FFFFFF' },
                    }}
                  >
                    תנאי שימוש
                  </MuiLink>
                  <MuiLink
                    component={Link}
                    to="/privacy"
                    underline="hover"
                    color="#E5E7EB"
                    sx={{
                      fontSize: { xs: 12, sm: 13 },
                      textAlign: { xs: 'center', sm: 'left' },
                      '&:hover': { color: '#FFFFFF' },
                    }}
                  >
                    מדיניות פרטיות
                  </MuiLink>
                </Stack>
              </Stack>
              <Stack gap={0.4} alignItems={{ xs: 'center', sm: 'flex-start' }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: 12, sm: 13 },
                    color: '#FFFFFF',
                    textAlign: { xs: 'center', sm: 'left' },
                  }}
                >
                  מוגבל רק לאילת
                </Typography>
              </Stack>
            </Stack>

            {/* זכויות יוצרים - באמצע */}
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                mt: { xs: 0.5, sm: 0.75 },
                color: '#D1D5DB',
                fontSize: { xs: 10, sm: 11 },
                textAlign: 'center',
              }}
            >
              © {new Date().getFullYear()} תשאל את דודו. relaya
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}



