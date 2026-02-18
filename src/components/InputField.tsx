interface Props{
    placeholder?: string;
    label: string;
}

function InputField({placeholder, label}: Props) {
    return (
        <div className="space-y-2">
            <label className="block text-xs font-semibold tracking-widest text-heading/80">{label}</label>
            <input
                type="text"
                id={label.toLowerCase().replace(/\s+/g, '-')}
                className="w-full rounded-xl border px-4 py-3 text-sm duration-200 focus:outline-none focus:ring-4"
                placeholder={placeholder || "Enter text"}
                required
            />
        </div>
    )
}

export default InputField;