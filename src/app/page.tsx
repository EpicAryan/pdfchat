import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { auth } from '@clerk/nextjs/server';
import Link from "next/link";
import { LogIn } from "lucide-react";
import FileUpload from "@/components/FileUpload";

export default async function Home() {
  const{userId} = await auth()
  const isAuth = !!userId;
  return (
    <div className="w-screen max-h-screen ">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center text-white">
          <div className="flex items-center mb-2">
            <h1 className="mr-3 text-3xl lg:text-5xl font-semibold">Talk with your PDF</h1>
            <UserButton />
          </div>
          <div className="flex mt-2">
            {isAuth && <Button>Go to Chats</Button>}
          </div>
          <p className="max-w-xl my-2 text-md lg:text-lg text-slate-300">Transform the way you learn and research—join a global community leveraging AI for instant, intelligent answers and in-depth analysis.</p>

          <div className="w-full mt-4">
            {isAuth ? (
              <FileUpload />
            ):(
              <Link href="/sign-in">
                <Button className="">Login to get Started
                  <LogIn className="ml-2" size={18} />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
