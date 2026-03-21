import { ArrowLeft, CalendarDays } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBlogBySlug, resolveMediaUrl } from '../lib/api';

function formatDate(dateValue) {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateValue));
}

function getContentBlocks(content) {
  if (Array.isArray(content)) {
    return content;
  }

  if (content && typeof content === 'object' && Array.isArray(content.blocks)) {
    return content.blocks;
  }

  if (typeof content === 'string') {
    return content
      .split('\n')
      .filter(Boolean)
      .map((text) => ({ type: 'paragraph', text }));
  }

  return [];
}

function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    setErrorMessage('');

    getBlogBySlug(slug)
      .then((response) => {
        if (isMounted) {
          setBlog(response);
        }
      })
      .catch((error) => {
        if (isMounted) {
          setErrorMessage(error.message);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (isLoading) {
    return <div className="min-h-screen bg-[#f8fafc] pt-36"><div className="mx-auto h-96 max-w-5xl animate-pulse rounded-[32px] bg-white px-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]" /></div>;
  }

  if (errorMessage) {
    return (
      <main className="min-h-screen bg-[#f8fafc] px-6 pt-36 pb-24">
        <div className="mx-auto max-w-4xl rounded-[28px] border border-rose-100 bg-rose-50 px-8 py-8 text-rose-700">
          <p>{errorMessage}</p>
          <Link to="/blog" className="mt-5 inline-flex items-center gap-2 font-semibold text-[#0d5e65]">
            <ArrowLeft size={18} />
            Back to blogs
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pb-24">
      <section className="mx-auto">
        {/* <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0d5e65] hover:text-[#e4af47]">
          <ArrowLeft size={18} />
          Back to blogs
        </Link> */}

        <article className=" overflow-hidden  bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <div className="relative h-72 bg-gradient-to-br from-[#0d4d63] via-[#12736d] to-[#e4af47] md:h-[420px]">
            {blog.image ? <img src={resolveMediaUrl(blog.image)} alt={blog.title} className="h-full w-full object-cover" /> : null}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-sm">
                <CalendarDays size={16} />
                {formatDate(blog.createdAt)}
              </div>
              <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl">{blog.title}</h1>
            </div>
          </div>

          <div className="px-8 py-10 md:px-12 md:py-14">
            <div className="prose prose-slate max-w-none text-lg leading-8 text-slate-700">
              {getContentBlocks(blog.content).map((block, index) => {
                if (block.type === 'heading') {
                  const HeadingTag = block.level === 1 ? 'h1' : block.level === 3 ? 'h3' : 'h2';
                  return <HeadingTag key={`${blog._id}-heading-${index}`}>{block.text}</HeadingTag>;
                }

                if (block.type === 'image' && block.url) {
                  return <img key={`${blog._id}-image-${index}`} src={resolveMediaUrl(block.url)} alt={blog.title} className="my-6 w-full rounded-2xl object-cover" />;
                }

                if (block.type === 'spacer') {
                  return <div key={`${blog._id}-spacer-${index}`} className="h-8" />;
                }

                return <p key={`${blog._id}-paragraph-${index}`}>{block.text}</p>;
              })}
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}

export default BlogDetail;
