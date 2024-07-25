export default function LoginPage() {
  const loginUrl: string = "http://localhost:3000/api/auth/google";
  // function handleGoogleLogin() {}
  return (
    <div className="flex flex-col justify-between items-center h-full">
      <h2 className="text-3xl">Login page</h2>
      <a href={loginUrl} className="btn btn-primary btn-rounded">
        Login With Google
      </a>
    </div>
  );
}
