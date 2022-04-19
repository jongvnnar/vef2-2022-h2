import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { CartProvider } from '../context/CartContext';
import { AuthWrapper } from '../context/Auth';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthWrapper>
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CartProvider>
    </AuthWrapper>
  );
}

export default MyApp;
