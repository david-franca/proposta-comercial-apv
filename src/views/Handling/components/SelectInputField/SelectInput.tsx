import ReactSelect from "react-select";

const SelectInput = () => {
  return (
    <ReactSelect
      isClearable
      isSearchable
      options={[{ value: "1", label: "Primeiro" }]}
      styles={{}}
    />
  );
};

export { SelectInput };
