import { Form } from "react-router";

export default function Login() {
  return (
    <Form action="/auth/google" method="GET">
      <button>Login with Google</button>
    </Form>
  );
}
