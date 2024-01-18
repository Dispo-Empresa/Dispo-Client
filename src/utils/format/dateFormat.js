function dateFormat(date) {
  return new Date(new Date(date).toLocaleDateString("pt-BR"));
}

export default dateFormat;