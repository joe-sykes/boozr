import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { VerifiedRating } from '../../src/strucutre/utils';

// Reuse font across all components
const font = "'Lexend Deca', sans-serif";

// Get all slugs for static generation
export async function getStaticPaths() {
  const res = await fetch('https://api.sheetbest.com/sheets/42cb92df-41b2-4446-99aa-b866d360fd59');
  const pubs = await res.json();
  const paths = pubs.map(pub => ({ params: { slug: pub.slug } }));
  return { paths, fallback: false };
}

// Get pub data for each page
export async function getStaticProps({ params }) {
  const res = await fetch('https://api.sheetbest.com/sheets/42cb92df-41b2-4446-99aa-b866d360fd59');
  const pubs = await res.json();
  const pub = pubs.find(p => p.slug === params.slug);
  return { props: { pub } };
}

// Extract beer data from spreadsheet structure
const extractBeers = (prefix, count, pub) =>
  Array.from({ length: count }, (_, i) => ({
    name: pub[`${prefix}${i + 1}_name`],
    brewery: pub[`${prefix}${i + 1}_brewery`],
    style: pub[`${prefix}${i + 1}_style`],
    price: pub[`${prefix}${i + 1}_price`],
  })).filter(b => b.name);

// Render beers
const BeerList = ({ title, beers }) => (
  <div>
    <h2>{title}</h2>
    {beers.map((beer, idx) => (
      <p key={idx}>
        <strong>{beer.name}</strong> / {beer.brewery} / {beer.style} / {beer.price}
      </p>
    ))}
  </div>
);

// Show star ratings
const StarRating = ({ value, max = 5 }) => {
  const stars = [];
  for (let i = 1; i <= max; i++) {
    stars.push(i <= value ? '★' : '☆');
  }
  return (
    <span style={{ color: '#f4a261', fontSize: '1.2rem', fontFamily: font }}>
      {stars.join(' ')}
    </span>
  );
};

export default function PubPage({ pub }) {
  const caskBeers = extractBeers('cask', 10, pub);
  const kegBeers = extractBeers('keg', 20, pub);

  const ratings = [
    { label: "Cleanliness", value: pub.rating_cleanliness },
    { label: "Rustic", value: pub.rating_rustic },
    { label: "Pub Garden", value: pub.rating_garden },
    { label: "Atmosphere", value: pub.rating_atmosphere },
    { label: "Staff & Service", value: pub.rating_service },
  ];

  const mapSrc = `https://maps.google.com/maps?q=${pub.lat},${pub.lng}&z=15&output=embed`;

  return (
    <>
      <Head>
        <title>{pub.name} - boozr</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* NAVIGATION */}
      <nav style={{
        background: '#264653',
        color: 'white',
        padding: '1rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: font,
        gap: '1rem'
      }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer'
          }}>
            <img src="/img/icon32.png" alt="boozr icon" width="24" height="24" />
            <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>boozr</span>
          </div>
        </Link>
        <h1 style={{ fontSize: '1.5rem', margin: 0, display: 'flex', alignItems: 'center' }}>
          {pub.name}
          <VerifiedRating rating={pub.boozr_rating} />
        </h1>
        <input
          type="text"
          placeholder="Search..."
          style={{
            borderRadius: '999px',
            padding: '0.5rem 1rem',
            fontFamily: font,
            flex: '1 1 200px',
            maxWidth: '200px'
          }}
        />
      </nav>

      {/* HERO / IMAGE + INFO */}
      <section style={{
        display: 'flex',
        flexWrap: 'wrap',
        padding: '2rem',
        gap: '2rem',
        fontFamily: font,
        justifyContent: 'center'
      }}>
        <img
          src={pub.image_url}
          alt={`${pub.name} pub photo`}
          style={{ borderRadius: '1rem', width: '100%', maxWidth: '300px', objectFit: 'cover' }}
        />
        <div style={{ flex: '1 1 300px' }}>
          <p><strong>Owned by:</strong> {pub.owner}</p>
          <p>{pub.blurb}</p>
          <p><strong>Tags:</strong> {pub.tags}</p>
        </div>
      </section>

      {/* BEERS */}
      <section style={{
        padding: '2rem',
        background: '#f4f4f4',
        fontFamily: font,
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        justifyContent: 'center'
      }}>
        <div style={{ flex: '1 1 300px' }}>
          <BeerList title="Cask" beers={caskBeers} />
        </div>
        <div style={{ flex: '1 1 300px' }}>
          <BeerList title="Keg" beers={kegBeers} />
        </div>
      </section>

      {/* RATINGS + MAP */}
      <section style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '2rem',
        padding: '2rem',
        fontFamily: font,
        justifyContent: 'center'
      }}>
        <div style={{ flex: '1 1 300px' }}>
          <h2>boozr Ratings</h2>
          {ratings.map((r, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem',
              backgroundColor: i % 2 === 0 ? '#f5f5f5' : '#ffffff'
            }}>
              <span>{r.label}</span>
              <StarRating value={parseInt(r.value)} />
            </div>
          ))}
        </div>

        <div style={{ flex: '1 1 300px' }}>
          <iframe
            width="100%"
            height="300"
            style={{ border: 0, borderRadius: '8px' }}
            src={mapSrc}
            allowFullScreen
            loading="lazy"
          />
        </div>
      </section>

      {/* GOOGLE REVIEWS */}
      <section style={{
        padding: '2rem',
        background: '#e9c46a',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        fontFamily: font
      }}>
        <strong>Google Reviews: </strong>
        {pub.google_reviews?.split('\n').map((r, i) => (
          <span key={i} style={{ marginRight: '2rem' }}>{r}</span>
        ))}
      </section>

      {/* FOOTER */}
      <footer style={{
        background: '#264653',
        color: 'white',
        textAlign: 'center',
        padding: '1rem',
        fontFamily: font
      }}>
        © {new Date().getFullYear()} boozr · Crafted by Bear
      </footer>
    </>
  );
}
