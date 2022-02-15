interface Props {
  words: string[];
  title: string;
}

export const WorldList = ({ words = [], title }: Props) => {
  return (
    <div className="mt-6">
      <h3 className="text-left text-xl font-mono font-bold text-slate-400 pb-2">
        {title} ({words.length})
      </h3>
      <div className="">
        {words.map((word, index) => {
          return (
            <span
              key={index}
              className="flex font-mono text-slate-400 uppercase tracking-wider font-bold"
            >
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
