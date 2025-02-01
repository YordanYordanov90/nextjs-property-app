import { SignIn } from "@clerk/nextjs";
import Link from 'next/link';

export default function Page() {
  return (

    <div className='flex flex-col space-y-2 items-center justify-center h-screen'>

    <SignIn
      appearance={{
          elements: {
              card: "bg-card border border-border shadow-lg rounded-xl p-6",
              headerTitle: "hidden",
              headerSubtitle: "text-muted-foreground",
              socialButtonsBlockButton__google: " hover:bg-white/60",
              dividerText: "text-muted-foreground",
              dividerLine: "bg-border",
              formFieldLabel: "text-foreground",
              footer: "hidden",
            },
        }}
        />
        <p className='text-sm'>Don&apos;t have an account? {'  '} <Link className='underline' href="/sign-up">Sign Up</Link></p>
        </div>
  );
}
