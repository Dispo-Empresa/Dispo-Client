import { Accordion, AccordionTab } from "primereact/accordion";

const ConfirmationStep = ({ errors, values, handleChange }) => {
  return (
    <div>
      <Accordion activeIndex={0}>
        <AccordionTab header="Lote 1"></AccordionTab>
        <AccordionTab header="Lote 2"></AccordionTab>
        <AccordionTab header="Lote 3"></AccordionTab>
      </Accordion>
    </div>
  );
};

export default ConfirmationStep;
