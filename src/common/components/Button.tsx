interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      {...props}
      className='border border-gray-800 rounded-md py-2 px-4 hover:bg-gray-100 transition'
    />
  );
};
