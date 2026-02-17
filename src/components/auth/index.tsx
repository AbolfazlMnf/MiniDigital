import { currentUser } from "@clerk/nextjs/server";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { AdminMenu } from "./AdminMenu";
export default async function Auth() {
  const user = await currentUser();
  const isAdmin = user?.privateMetadata?.isAdmin;

  return (
    <div>
      <SignedIn>{isAdmin ? <AdminMenu /> : <UserButton />}</SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  );
}
