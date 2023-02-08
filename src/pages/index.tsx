import Head from 'next/head';
import TestComponent from './TestComp';
import Album from './Album';

export default function Home() {
  return (
    <>
      <main>
        <TestComponent />
        <Album />
      </main>
    </>
  );
}
