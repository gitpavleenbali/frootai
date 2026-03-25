import React, { useState, useRef, useEffect, useCallback } from 'react';

const SUGGESTIONS = [
  'RAG architecture',
  'Solution Play 01',
  'Cost optimization',
  'Embeddings',
  'Azure AI Search',
  'DevKit setup',
];

export default function SearchBarWrapper() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searchIndex, setSearchIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);
  const btnRef = useRef(null);
  const [dropPos, setDropPos] = useState({ top: 0, right: 0 });

  // Load search index on first open
  const loadIndex = useCallback(async () => {
    if (searchIndex) return searchIndex;
    setLoading(true);
    try {
      const resp = await fetch('/search-index.json');
      const data = await resp.json();
      setSearchIndex(data);
      setLoading(false);
      return data;
    } catch {
      setLoading(false);
      return null;
    }
  }, [searchIndex]);

  // Search function
  const doSearch = useCallback((q, index) => {
    if (!q || !index) return [];
    const lower = q.toLowerCase();
    const matches = [];
    for (const doc of index) {
      const title = (doc.t || doc.title || '').toLowerCase();
      const content = (doc.b || doc.body || doc.content || '').toLowerCase();
      const url = doc.u || doc.url || '';
      if (title.includes(lower) || content.includes(lower)) {
        matches.push({
          title: doc.t || doc.title || 'Untitled',
          url: url,
          excerpt: (doc.b || doc.body || doc.content || '').substring(0, 120),
        });
      }
      if (matches.length >= 8) break;
    }
    return matches;
  }, []);

  // Handle pill click
  const handleOpen = useCallback(async () => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setDropPos({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
    setIsOpen(true);
    const idx = await loadIndex();
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [loadIndex]);

  // Handle typing
  const handleInput = useCallback((e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length > 0 && searchIndex) {
      setResults(doSearch(val, searchIndex));
    } else {
      setResults([]);
    }
  }, [searchIndex, doSearch]);

  // Close on outside click or Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target) &&
          btnRef.current && !btnRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isOpen]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) { setQuery(''); setResults([]); }
  }, [isOpen]);

  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', order: 5 }}>
      {/* Purple pill button */}
      <button
        ref={btnRef}
        onClick={handleOpen}
        aria-label="Search"
        style={{
          background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(167,139,250,0.08))',
          border: '1px solid rgba(124,58,237,0.4)',
          borderRadius: '10px',
          padding: '6px 14px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontWeight: 700,
          fontSize: '0.85rem',
          color: '#a78bfa',
          transition: 'all 0.3s ease',
          textShadow: '0 0 8px rgba(124,58,237,0.2)',
          outline: 'none',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(167,139,250,0.15))';
          e.currentTarget.style.borderColor = 'rgba(124,58,237,0.6)';
          e.currentTarget.style.boxShadow = '0 0 20px rgba(124,58,237,0.3), 0 0 40px rgba(124,58,237,0.1)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(167,139,250,0.08))';
          e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)';
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.transform = 'none';
        }}
      >
        🔍
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <div
          ref={dropdownRef}
          style={{
            position: 'fixed',
            top: dropPos.top,
            right: dropPos.right,
            width: '340px',
            maxHeight: '420px',
            background: 'rgba(10,10,22,0.97)',
            border: '1px solid rgba(124,58,237,0.3)',
            borderRadius: '12px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.6), 0 0 20px rgba(124,58,237,0.15)',
            backdropFilter: 'blur(16px)',
            zIndex: 9999,
            overflow: 'hidden',
            animation: 'searchDropIn 0.15s ease-out',
          }}
        >
          {/* Search input */}
          <div style={{ padding: '12px 14px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInput}
              placeholder="Search FrootAI..."
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(124,58,237,0.25)',
                borderRadius: '8px',
                padding: '10px 12px',
                color: '#e0e0e0',
                fontSize: '0.88rem',
                outline: 'none',
                caretColor: '#a78bfa',
              }}
              onFocus={(e) => { e.target.style.borderColor = 'rgba(124,58,237,0.5)'; }}
              onBlur={(e) => { e.target.style.borderColor = 'rgba(124,58,237,0.25)'; }}
            />
          </div>

          {/* Content area */}
          <div style={{ maxHeight: '340px', overflowY: 'auto', padding: '8px 0' }}>
            {loading && (
              <div style={{ padding: '20px', textAlign: 'center', color: 'rgba(167,139,250,0.5)', fontSize: '0.82rem' }}>
                Loading search index...
              </div>
            )}

            {/* Suggestions when empty */}
            {!loading && query.length === 0 && (
              <div style={{ padding: '8px 14px' }}>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
                  Try searching for
                </div>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => { setQuery(s); if (searchIndex) setResults(doSearch(s, searchIndex)); }}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      padding: '8px 10px',
                      color: 'rgba(167,139,250,0.6)',
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      borderRadius: '6px',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(124,58,237,0.1)'; e.currentTarget.style.color = '#c4b5fd'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'rgba(167,139,250,0.6)'; }}
                  >
                    🔍 {s}
                  </button>
                ))}
              </div>
            )}

            {/* Results */}
            {!loading && query.length > 0 && results.length > 0 && results.map((r, i) => (
              <a
                key={i}
                href={r.url}
                onClick={() => setIsOpen(false)}
                style={{
                  display: 'block',
                  padding: '10px 14px',
                  color: '#e0e0e0',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(124,58,237,0.1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
              >
                <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '2px' }}>{r.title}</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', lineHeight: '1.3' }}>
                  {r.excerpt}...
                </div>
              </a>
            ))}

            {/* No results (only when typing) */}
            {!loading && query.length > 0 && results.length === 0 && (
              <div style={{ padding: '20px 14px', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.84rem' }}>
                No results for "{query}"
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes searchDropIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
