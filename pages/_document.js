import Document, { Html, Head, Main, NextScript } from 'next/document';
import { getServerSideToken, getUserScript } from '../lib/auth';

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)

        const userData = await getServerSideToken(ctx.req)

        return { ...initialProps, ...userData }
      }
    render() {
        const { user = {} } = this.props;
        return (
            <Html>
                <Head>
                    <link rel="manifest" href="/static/manifest.json" />
                    <meta name="mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="application-name" content="universal-react" />
                    <meta
                        name="apple-mobile-web-app-title"
                        content="universal-react"
                    />
                    <meta name="theme-color" content="#f60" />
                    <meta name="msapplication-navbutton-color" content="#f60" />
                    <meta
                        name="apple-mobile-web-app-status-bar-style"
                        content="black-translucent"
                    />
                    <meta name="msapplication-starturl" content="/" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, shrink-to-fit=no"
                    />

                    <link
                        rel="icon"
                        type="image/png"
                        sizes="512x512"
                        href="/static/icons/icon-512x512.png"
                    />
                    <link
                        rel="apple-touch-icon"
                        type="image/png"
                        sizes="512x512"
                        href="/static/icons/icon-512x512.png"
                    />
                    <link
                        rel="icon"
                        sizes="192x192"
                        href="/static/icons/icon-192x192.png"
                    />
                    <link
                        rel="apple-touch-icon"
                        sizes="192x192"
                        href="/static/icons/icon-192x192.png"
                    />
                </Head>
                <body>
                    <Main />
                    <script dangerouslySetInnerHTML={{__html: getUserScript(user)}} />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
