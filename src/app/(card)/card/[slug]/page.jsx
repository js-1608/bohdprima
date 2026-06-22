import BusinessCardView from "../../../../views/BusinessCardView";
import { getCardBySlug } from "../../../../lib/api";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const card = await getCardBySlug(slug);
    const titleText = card.title
      ? `${card.name} - ${card.title} | Bodh Prima`
      : `${card.name} | Bodh Prima`;
    const descText = `Digital Business Card of ${card.name}${
      card.title ? `, ${card.title}` : ""
    }${
      card.company ? ` at ${card.company}` : ""
    }. View contact details, website, social links, and connect directly.`;

    return {
      title: titleText,
      description: descText,
      keywords: `Bodh Prima, ${card.name}, business card, digital profile, logistics card, shipping staff`,
      openGraph: {
        title: titleText,
        description: descText,
        type: 'profile',
      },
    };
  } catch (error) {
    return {
      title: "Business Card | Bodh Prima",
      description: "Digital Business Card from Bodh Prima.",
    };
  }
}

export default function Page() {
  return <BusinessCardView />;
}
