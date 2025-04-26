import { Form } from "react-router";
import { GoogleIcon } from "~/components/icons";
import { Button } from "~/components/ui/button";
import logoRunningMan from "~/components/Training/logo-running-man.svg";

export default function Login() {
  return (
    <div className="w-full p-6">
      <div className="mb-8 flex flex-col items-center">
        <img src={logoRunningMan} alt="GymMemo Logo" className="mb-6 w-100" />
        <h1 className="mb-2 text-center text-2xl font-bold">
          GymMemoへようこそ！
        </h1>
        <p className="text-muted-foreground text-center text-sm">
          トレーニング記録を簡単にメモしましょう
        </p>
      </div>

      <Form action="/auth/google" method="POST">
        <Button
          type="submit"
          variant="outline"
          className="h-12 w-full gap-2"
          aria-label="Continue with Google account"
        >
          <GoogleIcon className="size-5" />
          <span className="font-semibold">Googleでログイン</span>
        </Button>
      </Form>
    </div>
  );
}
