import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import logo from "../../assets/img/logo_sem_fundo.png";

function NotAuthorized() {
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
            <Typography variant="h1">401</Typography>
            <Typography variant="h6">
              Página não existe ou o usuário não tem autorização
            </Typography>
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

export default NotAuthorized;
