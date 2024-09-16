const MovementType = {
    Input: 0,
    Output: 1,
};

const categoryTypes = [
  { value: 0, label: "Alimentação" },
  { value: 1, label: "Bebidas" },
  { value: 2, label: "Vestuário" },
  { value: 3, label: "Esporte" },
  { value: 4, label: "Cosmético" },
  { value: 5, label: "Livros" },
  { value: 6, label: "Eletrônico" },
  { value: 7, label: "Video Games" },
  { value: 8, label: "Presentes" },
  { value: 9, label: "Informática" },
  { value: 10, label: "Outros" },
];

const unitOfMeasurementTypes = [
  { value: 0, label: "KG (Kilograma)" },
  { value: 1, label: "G (Grama)" },
  { value: 2, label: "L (Litro)" },
  { value: 3, label: "ML (Mililitro)" },
  { value: 4, label: "M (Metro)" },
  { value: 5, label: "CM  (Centímetro)" },
  { value: 6, label: "Outros" },
];

export { MovementType, categoryTypes, unitOfMeasurementTypes };