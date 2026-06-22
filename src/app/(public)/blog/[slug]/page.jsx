import BlogDetail from "../../../../views/BlogDetail";
import { getBlogBySlug } from "../../../../lib/api";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const blog = await getBlogBySlug(slug);
    const title = `${blog.title} | Bodh Prima`;
    const description = blog.excerpt || (blog.content && typeof blog.content === 'string' 
      ? blog.content.substring(0, 155) + "..." 
      : `Read the latest article: "${blog.title}". Find global logistics, supply chain and freight forwarding insights from Bodh Prima.`);
    
    return {
      title,
      description,
      keywords: `Bodh Prima, blog, ${blog.title}, logistics, global trade, freight forwarding, supply chain`,
      openGraph: {
        title,
        description,
        type: 'article',
        publishedTime: blog.createdAt,
        images: blog.image ? [blog.image] : [],
      }
    };
  } catch (error) {
    return {
      title: "Blog Post | Bodh Prima",
      description: "Read details on Bodh Prima blog.",
    };
  }
}

export default function Page() {
  return <BlogDetail />;
}
