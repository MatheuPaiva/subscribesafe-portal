import { useState } from "react";
import { AuthForms } from "@/components/auth/AuthForms";

const Auth = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  return (
    <AuthForms mode={mode} onModeChange={setMode} />
  );
};

export default Auth;