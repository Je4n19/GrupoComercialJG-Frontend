function Buscador({ valor, onChange }) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Buscar maquinaria, repuestos o marcas..."
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          border
          border-gray-300
          rounded-xl
          py-4
          pl-12
          pr-4
          text-gray-700
          focus:outline-none
          focus:ring-2
          focus:ring-orange-500
          focus:border-orange-500
          shadow-sm
        "
      />

      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
        🔍
      </span>
    </div>
  );
}

export default Buscador;
