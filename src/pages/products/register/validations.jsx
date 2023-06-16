function validateName(value, setNameError) {
  if (value.length <= 5) {
    setNameError("O nome deve contem mais de 5 caracteres");
    return;
  }

  setNameError(null);
}

function validateColor(value, setColorError) {
  if (value.length < 3 || value.length > 6) {
    setColorError("A cor hexademial deve ter 3 ou 6 caracteres");
    return;
  }

  setColorError(null);
}

export { validateName, validateColor };
