import { apiPath } from '../../../types/api.ts';

export default function LoginPage() {
  const loginUrl: string = `${apiPath.authPath}/google`;
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h2 className="text-2xl my-3">Login to Your Profile</h2>
      <p className="text-s text-primary-500 mb-6">
        You can use your google account to login to system
      </p>
      <a href={loginUrl} className="btn btn-primary btn-rounded">
        Login With Google
      </a>
    </div>
  );
}
