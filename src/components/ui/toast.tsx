type Props = {
  message: string;
  errors?: { message: string }[];
};

export const Toast = (props: Props) => {
  const { message, errors } = props;

  if (!errors || !errors.length) return message;

  return (
    <div className="flex flex-col gap-2">
      <span>{message}</span>
      <div className="flex flex-col gap-1">
        Fix the following problems
        <ul className="list-disc list-inside flex flex-col gap-1">
          {errors.map((e, i) => (
            <li key={i}>{e.message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
