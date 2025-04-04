import { Container, Grid, SimpleGrid, Skeleton, Image } from "@mantine/core";

const PRIMARY_COL_HEIGHT = "300px";

export default function LeadGrid({ images = 
  ['https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/682933/pexels-photo-682933.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=600'
  ] }) {
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  return (
    <Container my="md" fluid>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        {images[0] ? (
          <Image src={images[0]} height={PRIMARY_COL_HEIGHT} radius="md" />
        ) : (
          <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
        )}

        <Grid gutter="md">
          <Grid.Col>
            {images[1] ? (
              <Image src={images[1]} style={{height:'200px'}} radius="md" />
            ) : (
              <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
            )}
          </Grid.Col>

          <Grid.Col span={6}>
            {images[2] ? (
              <Image src={images[2]} style={{height:'150px'}} radius="md" />
            ) : (
              <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
            )}
          </Grid.Col>

          <Grid.Col span={6}>
            {images[3] ? (
              <Image src={images[3]} style={{height:'150px'}} radius="md" />
            ) : (
              <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
            )}
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}
