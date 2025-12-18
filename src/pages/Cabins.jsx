import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button from "../ui/Button";

function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Stort</p>
      </Row>
      <Row>
        <CabinTable />
        <Button onClick={() => setShowForm(showForm => !showForm)}>
          {!showForm ? "Add Cabin" : "Cancel"}
        </Button>
      </Row>
      {showForm && (
        <Row>
          <CreateCabinForm
            onCancel={() => setShowForm(showForm => !showForm)}
          />
        </Row>
      )}
    </>
  );
}

export default Cabins;
