import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteCabin } from "../../hooks/useDeleteCabin";
import { useState } from "react";

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
  const { mutate: DeleteCabin, isPending } = useDeleteCabin();
  const [showConfirm, setShowConfirm] = useState(false);

  const deleteHandle = () => {
    DeleteCabin(cabin.id);
    setShowConfirm(false);
  };

  return (
    <>
      <TableRow role="row">
        <Img src={cabin.image} />
        <Cabin>{cabin.name}</Cabin>
        <div>Fits up to {cabin.maxCapacity} guests</div>
        <Price>{formatCurrency(cabin.regularPrice)}</Price>
        <Discount>{formatCurrency(cabin.discount)}</Discount>
        <button onClick={() => setShowConfirm(true)} disabled={isPending}>
          Delete
        </button>
      </TableRow>
      {showConfirm && (
        <ConfirmDelete
          resourceName={cabin.name}
          onConfirm={deleteHandle}
          onCancel={() => setShowConfirm(false)}
          disabled={isPending}
        />
      )}
    </>
  );
}

export default CabinRow;
