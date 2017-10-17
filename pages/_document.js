import Document, { Head, Main, NextScript } from 'next/document'
import flush from 'styled-jsx/server'
import Layout from 'components/_layout'
import Zygote from 'components/zygote'

export default class MyDocument extends Document {
	static getInitialProps({ renderPage }) {
		const { html, head, errorHtml, chunks } = renderPage()
		const styles = flush()
		return { html, head, errorHtml, chunks, styles }
	}
	render() {
		return (
			<html>
				<Head>
					<meta charSet='utf-8' />
					<meta name='viewport' content='initial-scale=1.0, width=device-width' />
					<link rel='icon' type='image/png' href='/static/img/w_32/favicon.png' />
					<style jsx global>{`
						html, body{
							-webkit-tap-highlight-color: rgba(0,0,0,0);
						}
						html{
							box-sizing: border-box;
						}
						body{
							margin: 0;
							font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
							text-rendering: optimizeLegibility;
							-webkit-font-smoothing: antialiased;
						}
						*, *:before, *:after{
							box-sizing: inherit;
						}
					`}</style>
				</Head>
				<body>
					<Main />
					<NextScript />
					<Zygote />
				</body>
			</html>
		)
	}
}