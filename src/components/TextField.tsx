import { useTsController } from "@ts-react/form";

export function TextField() {
  const { field, error } = useTsController<string>();
  return (
    <>
      <input
        value={field.value ? field.value : ""} // conditional to prevent "uncontrolled to controlled" react warning
        onChange={(e) => {
          field.onChange(e.target.value);
        }}
      />
      {error?.errorMessage && <span>{error?.errorMessage}</span>}
    </>
  );
}
