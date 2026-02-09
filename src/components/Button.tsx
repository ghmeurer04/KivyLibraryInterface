interface Props {
    text: string;
    onClick: () => void | Promise<void> | Promise<boolean> | boolean;
}

function Button({ text, onClick }: Props) {
  return (
    <button className="inline-flex items-center justify-center rounded-full bg-emerald-300 px-8 py-3 text-lg font-semibold transition hover:bg-emerald-200" style={{ color: 'black' }} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
