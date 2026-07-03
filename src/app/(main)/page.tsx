import { Container } from "@/components/common/container";
import { Hero } from "@/components/home/hero";
import { LatestPosts } from "@/components/home/latest-posts";
import { FeaturedTags } from "@/components/home/featured-tags";
import { Divider } from "@/components/common/divider";
import { getPostSummaries } from "@/services/post-service";

export const revalidate = 3600;

export default async function Home() {
  const posts = await getPostSummaries();

  return (
    <Container>
      <Hero />
      <Divider />
      <LatestPosts posts={posts} />
      <Divider />
      <FeaturedTags posts={posts} />
    </Container>
  );
}
