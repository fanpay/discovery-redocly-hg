import React from 'react';

export default function BlogPost({ pageProps, children }) {
  const { title, author, date, timeToRead, tags } = pageProps.frontmatter;

  return (
    <div data-component-name="Templates/BlogPost" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '2px solid var(--border-color, #eee)', paddingBottom: '1.5rem' }}>
        {title && (
          <h1 style={{ color: 'var(--heading-text-color)', marginBottom: '1rem' }}>
            {title}
          </h1>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', fontSize: '0.9rem', color: '#666' }}>
          {author && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {author.avatar && (
                <img
                  src={author.avatar}
                  alt={author.name}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                />
              )}
              <span>By <strong>{author.name}</strong></span>
            </div>
          )}

          {date && <span>Published: {date}</span>}
          {timeToRead && <span>{timeToRead} read</span>}
        </div>

        {tags && tags.length > 0 && (
          <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: 'var(--navbar-bg-color, lightblue)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <main>
        {children}
      </main>
    </div>
  );
}
