import Grid from "@mui/material/Grid";
import { Box, Button, Container, Typography } from "@mui/material";

import logo from "assets/img/logo_sem_fundo.png";

function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">Servidor indisponível</Typography>
            <Button
              variant="contained"
              style={{ marginTop: "5%" }}
              href="/login/signin"
            >
              Voltar ao login do Dispo
            </Button>
          </Grid>
          <Grid xs={5}>
            <img
              src={logo}
              alt=""
              width={350}
              height={350}
              style={{ marginLeft: "15%" }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default NotFound;
