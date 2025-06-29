import Grid from './Grid.tsx';
import Section from './Section.tsx';

export default function ProductSpecializations() {
  const productData = [
    {
      title: 'Impinj',
      items: [
        'ItemSense',
        'API Integration',
        'IoT API and Speedway Connect',
        'Reader Configuration',
        'Reader Provisioning',
      ],
    },
    {
      title: 'PTC',
      items: [
        'ThingWorx 6',
        'ThingWorx 7',
        'ThingWorx 8',
        'Extension Development',
      ],
    },
    {
      title: 'SPOT',
      items: ['API Integration', 'Data Visualizations'],
    },
    {
      title: 'WISER Systems',
      items: [
        'Deployment',
        'Configuration',
        'API Integration',
        'Data Visualizations',
      ],
    },
    {
      title: 'ThingSpeak',
      items: [
        'Edge Server Development',
        'API Integration',
        'Data Visualizations',
      ],
    },
  ];

  return (
    <Grid cols="grid-cols-1 md:grid-cols-3">
      {productData.map((product) => (
        <Section title={product.title} items={product.items} />
      ))}
    </Grid>
  );
}
