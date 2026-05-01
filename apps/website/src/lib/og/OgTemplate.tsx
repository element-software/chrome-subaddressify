// Reusable OG image template — designed for Satori / next/og (ImageResponse).
// Use inline styles only; Tailwind and CSS modules are not available here.

export interface OgTemplateProps {
  /** Primary heading text. Use '\n' for explicit line breaks. */
  title: string;
  /** Optional blue-accented second line rendered below the title. */
  titleAccent?: string;
  /** Supporting description beneath the heading. */
  description: string;
  /** When true, renders the sub-address code example bar. */
  showEmailExample?: boolean;
  /** Badge label shown in the bottom-left pill. Defaults to the brand badge. */
  badgeText?: string;
  /** Base64 data URL for the brand icon. Pass result of readFileSync for icon128.png. */
  iconSrc?: string | undefined;
}

const c = {
  bg: '#020817',
  bgAccent: '#0a0f1e',
  bgCard: '#111827',
  blue600: '#2563eb',
  blue500: '#3b82f6',
  blue400: '#60a5fa',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
} as const;

export function OgTemplate({
  title,
  titleAccent,
  description,
  showEmailExample = false,
  badgeText = 'Free Chrome Extension · No Account Required',
  iconSrc,
}: OgTemplateProps) {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        background: `linear-gradient(145deg, #020817 0%, #0a0f1e 55%, #020817 100%)`,
        fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Radial blue glow — top-left */}
      <div
        style={{
          position: 'absolute',
          top: -260,
          left: -120,
          width: 700,
          height: 700,
          borderRadius: '50%',
          background:
            'radial-gradient(circle at center, rgba(37,99,235,0.18) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />
      {/* Radial blue glow — bottom-right */}
      <div
        style={{
          position: 'absolute',
          bottom: -200,
          right: -80,
          width: 540,
          height: 540,
          borderRadius: '50%',
          background:
            'radial-gradient(circle at center, rgba(37,99,235,0.10) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle dot grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      {/* Main content column */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          padding: '52px 72px 48px',
          position: 'relative',
        }}
      >
        {/* Header: logo + brand name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 'auto' }}>
          {iconSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={iconSrc}
              width={44}
              height={44}
              alt="Subaddressify icon"
              style={{ borderRadius: 10 }}
            />
          ) : (
            <div
              style={{
                width: 44,
                height: 44,
                background: c.blue600,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                fontWeight: 700,
                color: 'white',
              }}
            >
              @
            </div>
          )}
          <span
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: c.gray100,
              letterSpacing: '-0.01em',
            }}
          >
            Subaddressify
          </span>
        </div>

        {/* Heading block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            marginTop: 44,
            flex: 1,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <span
              style={{
                fontSize: 64,
                fontWeight: 700,
                color: c.gray50,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
              }}
            >
              {title}
            </span>
            {titleAccent && (
              <span
                style={{
                  fontSize: 64,
                  fontWeight: 700,
                  color: c.blue500,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                }}
              >
                {titleAccent}
              </span>
            )}
          </div>

          <p
            style={{
              fontSize: 26,
              color: c.gray400,
              margin: 0,
              lineHeight: 1.45,
              maxWidth: 820,
            }}
          >
            {description}
          </p>

          {showEmailExample && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: c.bgCard,
                border: `1px solid ${c.gray800}`,
                borderRadius: 14,
                padding: '14px 24px',
                marginTop: 8,
              }}
            >
              <span
                style={{
                  fontSize: 22,
                  color: c.blue400,
                  fontFamily: '"Courier New", "Lucida Console", monospace',
                  letterSpacing: '-0.01em',
                }}
              >
                you+20260501-example-com@yourdomain.com
              </span>
            </div>
          )}
        </div>

        {/* Footer row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 28,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(37,99,235,0.10)',
              border: '1px solid rgba(37,99,235,0.28)',
              borderRadius: 999,
              padding: '7px 16px',
            }}
          >
            <div
              style={{
                width: 7,
                height: 7,
                background: c.blue400,
                borderRadius: '50%',
              }}
            />
            <span style={{ fontSize: 15, color: c.blue400, fontWeight: 500 }}>
              {badgeText}
            </span>
          </div>
          <span style={{ fontSize: 15, color: c.gray600, fontWeight: 500 }}>
            subaddressify.com
          </span>
        </div>
      </div>
    </div>
  );
}
