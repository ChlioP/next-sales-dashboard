type Props = {
    onChange: (value: number) => void;
  };
  
  export default function FilterInput({ onChange }: Props) {
    return (
      <input
        type="number"
        placeholder="Enter stock threshold..."
        onChange={(e) => onChange(Number(e.target.value))}
        className="p-3 rounded-lg bg-white/80 backdrop-blur-md text-black placeholder-gray-500 mb-6 block w-full max-w-md shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
    );
  }
  