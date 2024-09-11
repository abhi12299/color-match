import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import ColorMatchingGame from '../components/ColorMatchingGame';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-[25vh] relative">
      <div>
        <Link href="https://x.com/abhishek_m_dev" target="_blank">
          <FaGithub className="absolute top-4 right-4" size={24} />
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-center mb-10">Match Colors!</h1>
      <div className="mb-10 text-center">
        <p className='mb-2'>
          A simple color matching game by&nbsp;
          <a href="https://x.com/abhishek_m_dev" target="_blank" className="underline">
            @abhishek_m_dev
          </a>
        </p>
        <p>
          Match the left color to the right color in the minimum number of moves!
        </p>
      </div>
      <div>
        <ColorMatchingGame />
      </div>
    </div>
  );
}
