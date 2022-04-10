import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import picture from '../public/index-pic.jpg';
import styles from '../styles/Index.module.scss';
const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>The Restaurant</title>
        <meta name="description" content="The Restaurant's homepage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className={styles.outer_container}>
        <div className={styles.image_container}>
          <div className={styles.image}>
            <Image
              placeholder="blur"
              alt="A picture of quail eggs and a ginger root"
              src={picture}
            />
          </div>
        </div>
        <div className={styles.text_container}>
          <h1 className={styles.title}>Welcome to the Restaurant!</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet
            aliquam sem, eget fringilla quam. Praesent ac magna at risus
            tincidunt maximus. Maecenas vitae dui gravida, interdum purus vel,
            gravida felis. Nam mauris elit, consectetur quis auctor vitae,
            mollis sed risus. Aenean quis sapien quis eros fermentum ornare in
            vitae enim. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Integer efficitur mi elit,
            eu placerat tortor aliquam vel.
          </p>
          <p>
            Phasellus ut nibh vulputate, tempus erat eu, accumsan purus. Donec
            eros metus, rutrum vel erat quis, interdum posuere purus.
            Suspendisse volutpat posuere nulla quis sollicitudin. Integer
            condimentum efficitur dolor eget tincidunt. Curabitur suscipit
            cursus auctor. Morbi augue mi, tincidunt at volutpat fermentum,
            fringilla sed erat. Nulla ornare arcu ut nulla tempus convallis.
            Nullam pellentesque sapien non mattis aliquam. Nullam et elementum
            erat.
          </p>
          <p>
            Cras quis vehicula massa, eu malesuada turpis. Nulla at arcu a ante
            placerat mollis a ac ligula. Fusce eu mi in neque consequat aliquam
            vel in tellus. Phasellus a felis vel urna lobortis efficitur. Aenean
            fringilla sapien magna, at pellentesque lorem bibendum et. Ut sit
            amet dictum quam. Class aptent taciti sociosqu ad litora torquent
            per conubia nostra, per inceptos himenaeos. Morbi pretium metus non
            augue pretium, sit amet congue tellus pellentesque. Maecenas aliquam
            tortor ac fermentum facilisis. Maecenas ac mi metus. Duis augue
            eros, rhoncus sed erat vitae, ultrices egestas mauris. Curabitur
            posuere rhoncus turpis, et luctus arcu rhoncus quis. Ut elementum
            aliquam arcu eu tempor. Quisque nec elit ipsum. Donec semper
            pulvinar sapien, ut auctor metus lobortis et.
          </p>
          <p>
            Etiam a purus eu urna tristique pellentesque ac a arcu. Maecenas
            dapibus augue et justo eleifend, sed ullamcorper leo dictum. Sed
            felis purus, viverra eget nulla ac, faucibus imperdiet magna.
            Vivamus dapibus eu diam eget vulputate. Nullam faucibus metus sit
            amet urna sollicitudin imperdiet. Sed in risus faucibus nunc feugiat
            consectetur sit amet et risus. Phasellus ac dui id lectus luctus
            posuere. Donec mollis odio in commodo maximus. Integer nec ante a
            est ornare vestibulum at ut enim. Donec arcu turpis, malesuada sed
            placerat sed, euismod rhoncus odio. Cras sit amet leo ultricies,
            posuere ipsum in, semper mauris. Quisque ex tortor, hendrerit nec
            dolor in, gravida sodales libero. Class aptent taciti sociosqu ad
            litora torquent per conubia nostra, per inceptos himenaeos. Aliquam
            ornare consequat turpis, eu laoreet elit euismod id. Vivamus sed
            augue ac nunc maximus finibus vel id est.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
