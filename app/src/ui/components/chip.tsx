interface Props {
  text: string;
}

export default function Chip({ text }: Props) {
  return (
    <div className="flex items-center gap-x-2 bg-gray-100 text-gray-500 px-2 py-1 rounded-sm border border-gray-300">
      <p className="text-xs">{text}</p>
    </div>
  );
}
