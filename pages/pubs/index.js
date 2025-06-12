export async function getStaticProps() {
    const res = await fetch('https://api.sheetbest.com/sheets/42cb92df-41b2-4446-99aa-b866d360fd59'); // replace with your Sheet.best URL
    const pubs = await res.json();
  
    return { props: { pubs } };
  }
  
  export default function PubsList({ pubs }) {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>All Pubs</h1>
        <ul>
          {pubs.map(pub => (
            <li key={pub.slug}>
              <a href={`/pubs/${pub.slug}`}>{pub.name} ({pub.slug})</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  