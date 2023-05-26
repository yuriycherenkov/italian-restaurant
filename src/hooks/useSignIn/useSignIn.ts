import { useState } from 'react';
import { signIn, SignInOptions } from 'next-auth/react';
import { useRouter } from 'next/router';

const useSignIn = () => {
  const [hasError, setError] = useState(false);
  const { push } = useRouter();

  const signInFn = (provider: string, options?: SignInOptions) =>
    signIn(provider, options).then(({ ok, url }: any) => {
      if (ok) {
        push(url);
      } else {
        setError(true);
      }
    });

  return { signIn: signInFn, hasError, setError };
};

export default useSignIn;
