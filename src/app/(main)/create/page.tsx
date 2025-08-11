import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { auth } from "~/lib/auth";
import { SongPanel } from "~/components/create/song-panel";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/sign-in")
  }

  return (
    <div className="flex h-full flex-col lg:flex-row">
      <SongPanel />
    </div>
  );
}
