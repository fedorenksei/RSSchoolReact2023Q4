import { Link } from 'react-router-dom';

interface Props {
  route: string;
  text: string;
}

export const LinkToPage = ({ route, text }: Props) => {
  return (
    <Link
      to={route}
      className="text-blue-900 hover:text-blue-600 transition-colors"
    >
      {text}
    </Link>
  );
};
