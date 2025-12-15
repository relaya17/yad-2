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
                sx={{
                  fontWeight: 950,
                  textDecoration: 'none',
                  color: 'inherit',
                  whiteSpace: 'nowrap',
                  letterSpacing: 0.4,
                  fontSize: { xs: 16, sm: 20 },
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
                <NavItem to="/terms">תנאי שימוש</NavItem>
                <NavItem to="/privacy">מדיניות פרטיות</NavItem>
                <MuiLink
                  href="mailto:contact@tishal-et-dudu.local"
                  sx={{ ...linkSx, opacity: 0.85, fontSize: { xs: 12, sm: 14 } }}
                >
                  מוגבל רק לאילת
                </MuiLink>
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

      <Container id="main" component="main" maxWidth="lg" sx={{ py: { xs: 2, sm: 3 }, px: { xs: 2, sm: 3 } }}>
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
              sx={{
                fontWeight: 950,
                fontSize: { xs: 18, sm: 20 },
                color: '#FFFFFF',
                textAlign: 'center',
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
                    to="/terms"
                    underline="hover"
                    color="#E5E7EB"
                    sx={{ fontSize: { xs: 12, sm: 13 }, textAlign: { xs: 'center', sm: 'left' }, '&:hover': { color: '#FFFFFF' } }}
                  >
                    תנאי שימוש
                  </MuiLink>
                  <MuiLink
                    component={Link}
                    to="/privacy"
                    underline="hover"
                    color="#E5E7EB"
                    sx={{ fontSize: { xs: 12, sm: 13 }, textAlign: { xs: 'center', sm: 'left' }, '&:hover': { color: '#FFFFFF' } }}
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



