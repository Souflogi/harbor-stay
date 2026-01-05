import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useState } from "react";
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

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  font-family: "Sono";
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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

  const [showForm, setShowForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDuplicateConfirm, setShowDuplicateConfirm] = useState(false);

  const deleteHandle = () => {
    DeleteCabin(id);
    setShowDeleteConfirm(false);
  };

  const duplicateHandle = () => {
    CreateCabin({
      name: name + "-copy",
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    });
    setShowDuplicateConfirm(false);
  };
  return (
    <>
      <TableRow role="row">
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
          <ButtonIcon
            type="button"
            aria-label="Duplicate cabin"
            onClick={() => setShowDuplicateConfirm(true)}
          >
            <HiOutlineSquare2Stack />
          </ButtonIcon>
          <ButtonIcon
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            disabled={isPending}
            aria-label="Delete cabin"
          >
            <HiOutlineTrash />
          </ButtonIcon>
          <ButtonIcon
            type="button"
            onClick={() => setShowForm(true)}
            aria-label="Edit cabin"
          >
            <HiOutlinePencilSquare />
          </ButtonIcon>
        </div>
      </TableRow>
      {showDeleteConfirm && (
        <ConfirmDelete
          resourceName={name}
          onConfirm={deleteHandle}
          onCancel={() => setShowDeleteConfirm(false)}
          disabled={isPending}
        />
      )}
      {showDuplicateConfirm && (
        <ConfirmDuplicate
          resourceName={name}
          onConfirm={duplicateHandle}
          onCancel={() => setShowDuplicateConfirm(false)}
          disabled={isPending}
        />
      )}
      {showForm && (
        <CreateCabinForm
          onCancel={() => setShowForm(false)}
          cabinToEdit={cabin}
        />
      )}
    </>
  );
}

export default CabinRow;
