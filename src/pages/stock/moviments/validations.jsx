function validateSuplier(value, setSuplierError) {
  if (value.length <= 3) {
    setSuplierError("O Fornecedor deve contem mais de 3 caracteres");
    return;
  }

  setSuplierError(null);
}

function validateQuantity(value, setQuantityError) {
  if (value < 1) {
    setQuantityError("A quantidade deve ser maior que 0!");
    return;
  }

  setQuantityError(null);
}

function validateProduct(value, setProductError) {
  if (value.length <= 3) {
    setProductError("O Produto deve conter mais de 3 caracteres");
    return;
  }

  setProductError(null);
}

export { validateSuplier, validateQuantity, validateProduct };
