function InputForm({
  placeholder,
  type,
  className,
  id,
  register,
  errors,
  disabled,
}) {
  return (
    <>
      <input
        disabled={disabled}
        id={id}
        placeholder={placeholder}
        type={type}
        className={`${errors[id] ? "border-rose-700" : ""} rounded-xl border-2 border-zinc-300 bg-zinc-100 px-6 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-700 md:w-72 ${className}`}
        {...register(id, { required: `${id} is required` })}
      />
      {errors[id] && (
        <p
          className="ml-14 flex w-full items-start text-xs capitalize text-rose-700"
          role="alert"
        >
          {errors[id].message}
        </p>
      )}
    </>
  );
}

export default InputForm;
