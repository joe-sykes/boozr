// pages/pubs/[slug].js
import { useRouter } from 'next/router';

/**
 * This function tells Next.js which dynamic routes to pre-render at build time.
 * It fetches all pub entries and maps their `slug` field into route paths.
 */
export async function getStaticPaths() {
  const res = await fetch('https://api.sheetbest.com/sheets/42cb92df-41b2-4446-99aa-b866d360fd59');
  const pubs = await res.json();

  // Create an array of paths like: { params: { slug: 'pub-slug' } }
  const paths = pubs.map(pub => ({
    params: { slug: pub.slug },
  }));

  return {
    paths,             // Tell Next.js which paths to build
    fallback: false    // Show 404 for any unknown slugs
  };
}

/**
 * This function runs at build time for each page defined by getStaticPaths.
 * It provides props to the page component by finding the matching pub by slug.
 */
export async function getStaticProps({ params }) {
  const res = await fetch('https://api.sheetbest.com/sheets/42cb92df-41b2-4446-99aa-b866d360fd59');
  const pubs = await res.json();

  // Find the pub that matches the dynamic slug from the URL
  const pub = pubs.find(p => p.slug === params.slug);

  return {
    props: {
      pub,   // Pass pub data to the page as props
    },
  };
}

/**
 * This is the page component rendered for each individual pub.
 */
export default function PubPage({ pub }) {
  // If pub data is missing (very unlikely), display a fallback
  if (!pub) {
    return <div>Pub not found.</div>;
  }

  return (
    <div>
      <h1>{pub.name}</h1>
      <p><strong>Address:</strong> {pub.address}</p>
      <p><strong>Hours:</strong> {pub.hours}</p>
      <p><strong>Features:</strong> {pub.features}</p>
      <p><strong>Beers:</strong> {pub.beers}</p>
      {pub.image_url && (
        <img src={pub.image_url} alt={pub.name} width={300} />
      )}
    </div>
  );
}
