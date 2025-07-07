// pages/index.js
import Head from "next/head";
import Link from "next/link";
import { Tag } from "lucide-react";
import { VerifiedRating } from '../src/strucutre/utils';

export async function getStaticProps() {
  const res = await fetch('https://api.sheetbest.com/sheets/42cb92df-41b2-4446-99aa-b866d360fd59');
  const pubs = await res.json();
  return { props: { pubs } };
}

export default function Home({ pubs }) {
  return (
    <>
      <Head>
        <title>boozr - Find the best pubs</title>
      </Head>

      <nav style={{
        background: '#264653',
        color: 'white',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'Lexend Deca, sans-serif',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'white' }}>
          <img src="/img/icon32.png" alt="boozr icon" width="24" height="24" />
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>boozr</span>
        </Link>
        <input type="text" placeholder="Search..." style={{
          borderRadius: '999px',
          padding: '0.5rem 1rem',
          fontFamily: 'Lexend Deca, sans-serif'
        }} />
      </nav>

      <header style={{
        textAlign: 'center',
        padding: '2rem',
        background: '#f4f4f4',
        fontFamily: 'Lexend Deca, sans-serif',
      }}>
        <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Find the perfect pub</h1>
        <p style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>Discover cask, keg, gardens, and more</p>
      </header>

      <main style={{
        padding: '2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        fontFamily: 'Lexend Deca, sans-serif',
      }}>
        {pubs.map((pub, i) => (
          <Link key={i} href={`/pubs/${pub.slug}`} style={{
            textDecoration: 'none',
            color: 'inherit'
          }}>
            <div style={{
              border: '1px solid #ddd',
              borderRadius: '1rem',
              padding: '1rem',
              background: 'white',
              transition: 'box-shadow 0.2s',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <img
                src={pub.image_url}
                alt={pub.name}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                  borderRadius: '0.5rem'
                }}
              />
              <h2 style={{ marginTop: '1rem', fontSize: '1.25rem' }}>
                <h1 style={{ fontSize: "2rem", display: "flex", alignItems: "center" }}>
                  {pub.name}
                  <VerifiedRating rating={pub.boozr_rating} />
                </h1>
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#555' }}>{pub.blurb}</p>
              <div style={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
              <Tag size={16} style={{ color: '#888' }} />
              {pub.tags?.split(',').map((tag, i) => (
                <span key={i} style={{
                  background: '#e0e0e0',
                  borderRadius: '999px',
                  padding: '0.25rem 0.75rem',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: '#333'
                }}>
                  {tag.trim()}
                </span>
              ))}
              </div>

            </div>
          </Link>
        ))}
      </main>

      <footer style={{
        background: '#264653',
        color: 'white',
        textAlign: 'center',
        padding: '1rem',
        fontFamily: 'Lexend Deca, sans-serif',
      }}>
        © {new Date().getFullYear()} boozr · Crafted by Bear
      </footer>
    </>
  );
}
