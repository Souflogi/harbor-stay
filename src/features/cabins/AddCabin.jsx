import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpenModal(showForm => !showForm)}>
        {!isOpenModal ? "Add Cabin" : "Cancel"}
      </Button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <CreateCabinForm
            onCloseModal={() => setIsOpenModal(false)}
            type="modal"
          />
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
