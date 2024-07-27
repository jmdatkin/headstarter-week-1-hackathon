import { SignIn } from "@clerk/nextjs";

export default async function LoginPage() {
  return (
    <div className="w-full h-full flex justify-center align-center">
      <SignIn />
    </div>
  );
}
