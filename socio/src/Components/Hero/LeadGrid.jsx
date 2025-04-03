import { Container, Grid, SimpleGrid, Skeleton, Image } from "@mantine/core";

const PRIMARY_COL_HEIGHT = "300px";

export default function LeadGrid({ images = [] }) {
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
              <Image src={images[1]} height={SECONDARY_COL_HEIGHT} radius="md" />
            ) : (
              <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
            )}
          </Grid.Col>

          <Grid.Col span={6}>
            {images[2] ? (
              <Image src={images[2]} height={SECONDARY_COL_HEIGHT} radius="md" />
            ) : (
              <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
            )}
          </Grid.Col>

          <Grid.Col span={6}>
            {images[3] ? (
              <Image src={images[3]} height={SECONDARY_COL_HEIGHT} radius="md" />
            ) : (
              <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
            )}
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}
