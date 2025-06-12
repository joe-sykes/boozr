// pages/pubs/[slug].js

export async function getStaticPaths() {
    const res = await fetch('https://sheet.best/api/sheets/YOUR_SHEET_ID'); // Replace with your Sheet.best URL
    const pubs = await res.json();
  
    const paths = pubs.map(pub => ({
      params: { slug: pub.slug }
    }));
  
    return { paths, fallback: false };
  }
  
  export async function getStaticProps({ params }) {
    const res = await fetch('https://api.sheetbest.com/sheets/42cb92df-41b2-4446-99aa-b866d360fd59');
    const pubs = await res.json();
    const pub = pubs.find(p => p.slug === params.slug);
  
    return { props: { pub } };
  }
  
  export default function PubPage({ pub }) {
    return (
      <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
        <h1>{pub.name}</h1>
        <p><strong>Address:</strong> {pub.address}</p>
        <p><strong>Hours:</strong> {pub.hours}</p>
        <p><strong>Beers:</strong> {pub.beers}</p>
        <p><strong>Features:</strong> {pub.features}</p>
        <img src={pub.image_url} alt={pub.name} style={{ width: '100%', maxWidth: '300px', marginTop: '1rem' }} />
      </div>
    );
  }
  