import Link from 'next/link';

interface LinkProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export const StyledLink: React.FC<LinkProps> = (props) => {
  return (
    <Link
      {...props}
      href={props.href}
      className='border border-gray-800 rounded-md px-4 py-2 hover:bg-gray-100 transition'
    />
  );
};
