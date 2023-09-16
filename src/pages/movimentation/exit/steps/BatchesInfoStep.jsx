import Datatable from "../../../..//components/structured/datatable/Datatable";
import ViewPanel from "../../../../layouts/panel/view/ViewPanel";
import { MDBCol } from "mdb-react-ui-kit";
import { TextField } from "../../../../components/ui/inputs/textfield/TextField";
import { Datefield } from "../../../../components/ui/inputs/date/DateField";
import RegisterPanelSimple from "../../../../layouts/panel/register/classic/RegisterPanelSimple";
import Button from "../../../../components/ui/buttons/classic/Button";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useState } from "react";

const BatchesInfoStep = ({ errors, values, handleChange }) => {
  const columns = [
    { field: "batch", header: "Lote", minWidth: "350px" },
    { field: "manufacturingDate", header: "Data de fabricação" },
    { field: "validatingDate", header: "Data de validade" },
    { field: "quantityOnBatch", header: "Quantidade" },
  ];

  const [batches, setBatches] = useState([]);

  const onInsertBatch = () => {
    const newBatch = {
      batch: values.batch,
      manufacturingDate: values.manufacturingDate.toLocaleDateString("pt-BR"),
      validatingDate: values.validatingDate.toLocaleDateString("pt-BR"),
      quantityOnBatch: values.quantityOnBatch,
    };

    setBatches([...batches, newBatch]);
  };

  const onDeleteRow = (rowToDelete) => {
    const updatedBatches = batches.filter((row) => row !== rowToDelete);

    setBatches(updatedBatches);
  };

  return (
    <div>
      <RegisterPanelSimple>
        <MDBCol>
          <TextField
            required
            name="batch"
            label="Lote"
            value={values.batch}
            error={errors.batch}
            onChange={handleChange}
          />
        </MDBCol>
        <MDBCol>
          <Datefield
            required
            name="manufacturingDate "
            label="Data de fabricação"
            value={values.manufacturingDate}
            error={errors.manufacturingDate}
            onChange={handleChange}
          />
        </MDBCol>
        <MDBCol>
          <Datefield
            required
            name="validatingDate "
            label="Data de fabricação"
            value={values.validatingDate}
            error={errors.validatingDate}
            onChange={handleChange}
          />
        </MDBCol>
        <MDBCol>
          <TextField
            required
            type="number"
            name="quantityOnBatch"
            label="Quantidade dentro do lote"
            value={values.quantityOnBatch}
            error={errors.quantityOnBatch}
            onChange={handleChange}
          />
        </MDBCol>
      </RegisterPanelSimple>
      <div>
        <b style={{ fontSize: "15px", fontWeight: "bold", color: "red" }}>
          Observação:
        </b>
        <label style={{ fontSize: "15px", fontWeight: "600" }}>
          &nbsp; Faltam 5 produtos para atingir a quantidade da OC
        </label>
      </div>
      <div style={{ padding: "5% 40% 0px" }}>
        <Button
          title="Inserir Lote"
          width="200px"
          height="45px"
          onClick={onInsertBatch}
          icon={<KeyboardDoubleArrowDownIcon />}
        />
      </div>
      <ViewPanel>
        <Datatable
          noDataMessage="Sem lotes no momento"
          columns={columns}
          data={batches}
          fromApi={false}
          onDeleteButton={onDeleteRow}
        />
      </ViewPanel>
    </div>
  );
};

export default BatchesInfoStep;
