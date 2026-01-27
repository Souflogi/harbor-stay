import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import FormRow from "../../ui/FormRow";
import { useUpdateCabin } from "./useUpdateCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { mutate: createCabin, isPending: createIsPending } = useCreateCabin();
  const { mutate: updateCabin, isPending: updateIsPending } = useUpdateCabin();

  const isEditing = Boolean(cabinToEdit?.id);
  const isPending = createIsPending || updateIsPending;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ defaultValues: isEditing ? cabinToEdit : null });

  function onSubmit(data) {
    if (isEditing) {
      updateCabin(
        { ...data, id: cabinToEdit.id },
        {
          onSuccess: () => onCloseModal?.(),
        },
      );
    } else {
      createCabin(data, {
        onSuccess: () => onCloseModal?.(),
        // onSuccess: () => {
        //   reset();
        //   onCloseModal?.();
        // },
      });
    }
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors.name?.message}>
        <Input
          {...register("name", {
            required: "This field is required",
          })}
          type="text"
          id="name"
          disabled={isPending}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors.maxCapacity?.message}>
        <Input
          {...register("maxCapacity", {
            required: "This field is required",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Capacity should be at least 1.",
            },
          })}
          type="number"
          id="maxCapacity"
          disabled={isPending}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors.regularPrice?.message}>
        <Input
          {...register("regularPrice", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          type="number"
          id="regularPrice"
          disabled={isPending}
        />
      </FormRow>

      <FormRow label="Discount" error={errors.discount?.message}>
        <Input
          {...register("discount", {
            required: "This field is required",
            valueAsNumber: true,
            validate: (discount, { regularPrice }) =>
              discount <= regularPrice ||
              "Discount cannot exceed the regular price.",
          })}
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isPending}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors.description?.message}
      >
        <Textarea
          {...register("description", {
            required: "This field is required",
          })}
          type="number"
          id="description"
          defaultValue=""
          disabled={isPending}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors.image?.message}>
        <FileInput
          {...register("image", {
            required: isEditing ? false : "Must upload an image",
          })}
          id="image"
          accept="image/*"
          disabled={isPending}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isPending}>
          {isEditing ? "Save Edits" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
