import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm type={"modal"} />
        </Modal.Window>

        {/* 
      <Modal.Open opens="table">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="table">
        <CreateCabinForm type={"modal"} />
      </Modal.Window> */}
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal(showForm => !showForm)}>
//         {!isOpenModal ? "Add Cabin" : "Cancel"}
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm
//             onCloseModal={() => setIsOpenModal(false)}
//             type="modal"
//           />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
