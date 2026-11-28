import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

// The diagnostic now requires an account so results can be tracked over time.
// Any old link to /start sends people to create (or sign in to) their account.
export default function StartPage() {
  redirect("/signup");
}
