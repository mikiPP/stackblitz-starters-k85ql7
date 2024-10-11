interface Props {
  question: string;
  answer: string;
}

export default function QuestionCard({ question, answer }: Props) {
  return (
    <div className="flex gap-x-4  items-center p-4 bg-white  rounded-lg hover:bg-background-color-600 transition-none duration-150">
      <div className="flex flex-col items-start">
        <h3 className="text-sm pb-1 font-semibold">{question}</h3>
        <p className="description text-sm">{answer}</p>
      </div>
    </div>
  );
}
