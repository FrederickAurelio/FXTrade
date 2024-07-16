function InputForm({ placeholder, type, className }) {
  return (
    <input
      placeholder={placeholder}
      type={type}
      className={`md:w-72 rounded-xl border-2 border-zinc-300 bg-zinc-100 px-6 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-700 ${className}`}
    />
  );
}

export default InputForm;
