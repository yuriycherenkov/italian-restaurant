import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { getProviders, getCsrfToken } from 'next-auth/react';
import { getSession } from 'next-auth/react';
import { InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { SignInForm } from '@/components/SignInForm';
import logo from 'public/next.svg';

export default function SignInPage({ csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Paper sx={{ p: 2, maxWidth: 700, margin: '0 auto', mt: 20 }}>
      <Stack alignItems="center">
        <Image src={logo} alt="logo" width={50} />
        <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
          Welcome to booking a meeting platform! 👋🏻
        </Typography>
        <Typography sx={{ mt: 1 }}>Please sign-in to your account and start the adventure</Typography>
        <SignInForm csrfToken={csrfToken} />
      </Stack>
    </Paper>
  );
}

export const getServerSideProps = async (ctx: any) => {
  const session = await getSession(ctx);

  if (session) {
    // return {
    //   redirect: { destination: '/' },
    // };
  }

  return {
    props: {
      providers: await getProviders(),
      csrfToken: await getCsrfToken(ctx),
    },
  };
};
