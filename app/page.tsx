import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import User from "components/components/User";
import { redirect } from "next/navigation";
import Game from "components/components/Game";
import SocketTest from "components/components/SocketTest";
import SnakeAndLadder from "components/components/Snake";
export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signin");
  }
  return (
    <div>
      <h1>HEllo</h1>
      <pre>{JSON.stringify(session)}</pre>
      <div>
        client
        <User />
        <SnakeAndLadder />
        {/* <Game /> */}
        {/* <SocketTest /> */}
      </div>
    </div>
  );
}
