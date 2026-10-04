function Buscador({ valor, onChange }) {
  return (
    <div className="relative group">
      <input
        type="text"
        placeholder="Buscar maquinaria, repuestos o marcas..."
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          bg-white
          border-2
          border-gray-200
          rounded-2xl
          py-4
          pl-14
          pr-5
          text-gray-700
          text-lg
          shadow-sm
          transition-all
          duration-300
          focus:outline-none
          focus:border-orange-500
          focus:ring-4
          focus:ring-orange-100
        "
      />

      <div
        className="
          absolute
          left-5
          top-1/2
          -translate-y-1/2
          text-orange-500
          text-xl
        "
      >
        🔍
      </div>

      {valor && (
        <button
          onClick={() => onChange("")}
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-gray-400
            hover:text-red-500
            transition
          "
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default Buscador;
