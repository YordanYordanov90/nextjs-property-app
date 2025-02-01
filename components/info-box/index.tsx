import Link from "next/link";

type Props = {
  name: string;
  description: string;
  link: string;
  background: string;
  href: string;
};

const InfoBox = ({ name, description, link, background, href }: Props) => {
  return (
    <div
      className={`${background} border border-gray-700  p-6 rounded-lg shadow-lg`}
    >
      <h2 className="text-2xl font-bold text-white">{name}</h2>
      <p className="mt-2 mb-6 text-gray-300">{description}</p>
      <Link
        href={href}
        className="inline-block rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 hover:scale-105 duration-100" 
      >
        {link}
      </Link>
    </div>
  );
};

export default InfoBox;
