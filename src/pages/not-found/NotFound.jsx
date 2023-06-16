import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

import logo from "../../assets/img/logo/DispoLogo.png";

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
            <Typography variant="h6">
              A página que você está acessando não existe ou você não tem acesso
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
              width={250}
              height={80}
              style={{ marginTop: "5%", marginLeft: "15%" }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default NotFound;
