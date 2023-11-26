import { useRouter } from 'next/router';
import { Button } from '../shared/ui-kit/Button';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="w-full h-full flex flex-col gap-5 items-center justify-center">
      <h1>404 Not Found</h1>
      <p>Page is not found on this URL</p>
      <Button onClick={() => router.push('/')}>Go home</Button>
    </div>
  );
}
