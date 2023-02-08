import { Html, Head, Main, NextScript } from 'next/document'
// import { ServerStyleSheets } from '@material-ui/core/styles';
import theme, { roboto } from '../theme';

export default function Document() {
  return (
    <Html lang="en" className={roboto.className}>
      <Head>
        {/* PWA primary color */}
        <meta name="theme-color" content={theme.palette.primary.main} />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="emotion-insertion-point" content="" />
        {/* {(this.props as any).emotionStyleTags} */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
