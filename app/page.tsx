"use client";

import { authClient} from "@/lib/auth-client"
import { Button } from "@/components/ui/button";


const HomePage = () => {
  const {data} = authClient.useSession();
  return (
    <div>
      {JSON.stringify(data)}
      {data && (
      <Button onClick={() => authClient.signOut()}>
        Logout
      </Button>
      )}
    </div>
  )
}

export default HomePage;