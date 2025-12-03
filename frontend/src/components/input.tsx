interface InputProps {
  placeholder: string;
  reference?: React.Ref<HTMLInputElement>;
}

export function Input({ placeholder, reference }: InputProps) {
  return (
    <div className="w-full">
      <input
        ref={reference}
        placeholder={placeholder}
        type="text"
        className="
                    w-full px-4 py-2
                    border border-slate-300
                    rounded-md
                    text-[#1C2939]
                    placeholder-slate-400
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#00835C]/30
                    focus:border-[#00835C]
                "
      />
    </div>
  );
}
