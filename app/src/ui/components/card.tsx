import Image from 'next/image';
import chartIcon from '@/public/images/chart.png';

interface Props {
  date?: string;
  whiteBackground?: boolean;
  onCardClick?: () => void;
  title: string;
  description: string;
}

export default function Card({ date, whiteBackground, onCardClick, title, description }: Props) {
  return (
    <button
      onClick={() => onCardClick && onCardClick()}
      className={`flex gap-x-4  items-center p-4 ${
        whiteBackground ? 'bg-white border border-gray-300 rounded-lg shadow-sm' : ''
      }`}
      aria-label="card"
    >
      <div className="h-16 w-16 bg-backgroud-color-500 rounded-md grid place-items-center">
        <Image src={chartIcon} alt="chart icon" height={36} width={36} />
      </div>
      <div className="flex flex-col items-start">
        <h3 className="text-sm pb-1 font-semibold">{title}</h3>
        <p className="text-sm">{description}</p>
        {date ? <p className="text-xs pt-1 text-gray-500">{date}</p> : null}
      </div>
    </button>
  );
}
