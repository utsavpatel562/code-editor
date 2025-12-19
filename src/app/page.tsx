import { SignOutButton, SignUpButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      <div className="">
        <SignUpButton />
        <SignOutButton />
      </div>
    </>
  );
}
