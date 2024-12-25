function Input({ label, placeholder, type, required = false }) {
  return (
    <label className="flex flex-col gap-1 font-medium">
      {label}
      <input
        name={label}
        type={type || "text"}
        placeholder={placeholder}
        required={required}
        className="font-normal w-full h-11 rounded-md border border-gray-200 focus:border-pink-main focus:outline-none p-3"
      />
    </label>
  );
}

export default Input;
