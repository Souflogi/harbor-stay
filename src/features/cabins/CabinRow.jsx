import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import ConfirmDelete from "../../ui/ConfirmDelete";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import ButtonIcon from "../../ui/ButtonIcon";
import {
  HiOutlinePencilSquare,
  HiOutlineSquare2Stack,
  HiOutlineTrash,
} from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import ConfirmDuplicate from "../../ui/ConfirmDuplicate";
import Modal from "../../ui/Modal";
import Table from "../../ui/Table";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-3px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Price = styled.div`
  font-weight: 600;
`;

const Discount = styled.div`
  font-weight: 500;
  color: var(--color-green-700);
`;
function CabinRow({ cabin }) {
  const { id, image, name, maxCapacity, regularPrice, discount, description } =
    cabin;
  const { mutate: DeleteCabin, isPending: isDeleting } = useDeleteCabin();
  const { mutate: CreateCabin, isPending: IsCreating } = useCreateCabin();

  const isPending = isDeleting || IsCreating;

  const deleteHandle = closeModal => {
    DeleteCabin(id, {
      onSuccess: () => {
        closeModal?.();
      },
    });
  };

  const duplicateHandle = closeModal => {
    CreateCabin(
      {
        name: name + "-copy",
        maxCapacity,
        regularPrice,
        discount,
        description,
        image,
      },
      {
        onSuccess: () => {
          closeModal?.();
        },
      },
    );
  };
  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <Modal>
          <Modal.Open opens={"duplicate-confirm"}>
            <ButtonIcon type="button" aria-label="Duplicate cabin">
              <HiOutlineSquare2Stack />
            </ButtonIcon>
          </Modal.Open>
          <Modal.Window name={"duplicate-confirm"}>
            <ConfirmDuplicate
              resourceName={name}
              onConfirm={duplicateHandle}
              disabled={isPending}
            />
          </Modal.Window>

          <Modal.Open opens={"edit-form"}>
            <ButtonIcon type="button" aria-label="Edit cabin">
              <HiOutlinePencilSquare />
            </ButtonIcon>
          </Modal.Open>
          <Modal.Window name={"edit-form"}>
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Open opens={"delete-confirm"}>
            <ButtonIcon
              type="button"
              disabled={isPending}
              aria-label="Delete cabin"
            >
              <HiOutlineTrash />
            </ButtonIcon>
          </Modal.Open>
          <Modal.Window name={"delete-confirm"}>
            <ConfirmDelete
              resourceName={name}
              onConfirm={deleteHandle}
              disabled={isPending}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
