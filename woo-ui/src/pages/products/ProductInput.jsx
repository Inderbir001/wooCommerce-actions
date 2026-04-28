export default function ProductInput({ placeholder, value, setValue }) {
  return (
    <input
      className="input"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
