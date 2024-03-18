import { categoryTypes, unitOfMeasurementTypes } from "utils/constants/enums";
import { SelectWithFilter } from "./SelectField";

function SelectProductCategory(props) {
  return (
    <SelectWithFilter
      id="category"
      required={!props.hideLabel}
      label={!props.hideLabel && "Categoria"}
      options={categoryTypes}
      value={props.value}
      error={props.error}
      onChange={props.onChange}
      disabled={props.disabled}
    ></SelectWithFilter>
  );
}

function SelectProductUnitOfMeasurement(props) {
  return (
    <SelectWithFilter
      id="unitOfMeasurement"
      required={!props.hideLabel}
      label={!props.hideLabel && "Unidade de peso"}
      options={unitOfMeasurementTypes}
      value={props.value}
      error={props.error}
      onChange={props.onChange}
      disabled={props.disabled}
    ></SelectWithFilter>
  );
}

export { SelectProductCategory, SelectProductUnitOfMeasurement };
