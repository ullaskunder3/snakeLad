import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import SnakeAndLadder from "components/components/Snake";
import Header from "components/components/Header";
export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }

  const { user } = session;
  return (
    <div>
      <Header name={user?.name || ""} />
      <SnakeAndLadder />
    </div>
  );
}
