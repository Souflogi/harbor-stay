import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useEffect } from "react";
import { useUpdateSettings } from "./useUpdateSettings";

function UpdateSettingsForm() {
  const { data: settings, isLoading } = useSettings();
  const { mutate: updateSettings, isPending: settingsIsUpdating } =
    useUpdateSettings();

  const {
    register,
    reset,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: settings,
    // mode: "onBlur",
    // reValidateMode: "onBlur",
  });

  useEffect(() => {
    // Keep form values in sync when settings load or refresh.
    if (settings) reset(settings);
  }, [settings, reset]);

  async function handleBlur(field, validateFields = [field]) {
    // Only persist when the relevant fields are valid and actually changed.
    const isValid = await trigger(validateFields);
    if (!isValid) return;

    const value = getValues(field);
    if (settings && settings[field] === value) return;

    updateSettings({ [field]: value });
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow
        label="Minimum nights/booking"
        error={errors.minBookingLength?.message}
      >
        <Input
          type="number"
          id="min-nights"
          {...register("minBookingLength", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Minimum nights must be at least 1",
            },
            valueAsNumber: true,
            validate: (minBookingLength, { maxBookingLength }) => {
              // Cross-field validation: min must not exceed max.
              return (
                maxBookingLength >= minBookingLength ||
                "Minimum nights can't exceed maximum nights"
              );
            },
            onBlur: () =>
              handleBlur("minBookingLength", [
                "minBookingLength",
                "maxBookingLength",
              ]),
          })}
          disabled={settingsIsUpdating}
        />
      </FormRow>
      <FormRow
        label="Maximum nights/booking"
        error={errors.maxBookingLength?.message}
      >
        <Input
          type="number"
          id="max-nights"
          {...register("maxBookingLength", {
            required: "This field is required",
            valueAsNumber: true,
            onBlur: () =>
              handleBlur("maxBookingLength", [
                "minBookingLength",
                "maxBookingLength",
              ]),
          })}
          disabled={settingsIsUpdating}
        />
      </FormRow>
      <FormRow
        label="Maximum guests/booking"
        error={errors.maxGuestsPerBooking?.message}
      >
        <Input
          type="number"
          id="max-guests"
          {...register("maxGuestsPerBooking", {
            required: "This field is required",
            valueAsNumber: true,
            onBlur: () => handleBlur("maxGuestsPerBooking"),
          })}
          disabled={settingsIsUpdating}
        />
      </FormRow>
      <FormRow label="Breakfast price" error={errors.breakfastPrice?.message}>
        <Input
          type="number"
          id="breakfast-price"
          {...register("breakfastPrice", {
            required: "This field is required",
            valueAsNumber: true,
            onBlur: () => handleBlur("breakfastPrice"),
          })}
          disabled={settingsIsUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
