export const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

export function cpfCnpjChange(e) {
    let data = e.target.value.replace(/\D/g, "");
        if (data.length > 11) {
          let cnpj = `${data.substr(0, 2)}.${data.substr(2, 3)}.${data.substr(
            5,
            3
          )}/`;
          if (data.length > 12) {
            cnpj += `${data.substr(8, 4)}-${data.substr(12, 2)}`;
          } else {
            cnpj += data.substr(8);
          }
          data = cnpj;
        } else {
          let cpf = "";
          let parts = Math.ceil(data.length / 3);
          for (let i = 0; i < parts; i++) {
            if (i === 3) {
              cpf += `-${data.substr(i * 3)}`;
              break;
            }
            cpf += `${i !== 0 ? "." : ""}${data.substr(i * 3, 3)}`;
          }
          data = cpf;
        }
        return data;
}

export function cnpjChange(e) {
  let data = e.target.value.replace(/\D/g, "");
  if (data.length > 11) {
    let cnpj = `${data.substr(0, 2)}.${data.substr(2, 3)}.${data.substr(
      5,
      3
    )}/`;
    if (data.length > 12) {
      cnpj += `${data.substr(8, 4)}-${data.substr(12, 2)}`;
    } else {
      cnpj += data.substr(8);
    }
    data = cnpj;
  } 

  return data;
}