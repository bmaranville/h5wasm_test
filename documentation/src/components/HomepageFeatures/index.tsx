import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'HDF5',
    Svg: require('@site/static/img/HDF_logo.svg').default,
    description: (
      <>
        Built on the <a href="https://www.hdfgroup.org/">HDF5</a> C API
      </>
    ),
  },
  {
    title: 'Built with Emscripten',
    Svg: require('@site/static/img/Emscripten_Logo.svg').default,
    description: (
      <>
        Compile libraries and applications for web-native use
        with <a href="https://emscripten.org">Emscripten</a>
      </>
    ),
  },
  {
    title: 'Powered by WebAssembly',
    Svg: require('@site/static/img/WebAssembly_Logo.svg').default,
    description: (
      <>
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
