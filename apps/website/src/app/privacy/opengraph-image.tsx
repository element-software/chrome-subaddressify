import { ImageResponse } from 'next/og';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { OgTemplate } from '@/lib/og/OgTemplate';

export const runtime = 'nodejs';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };

function getIconDataUrl(): string | undefined {
  try {
    const iconPath = join(process.cwd(), 'public', 'icon128.png');
    const iconBuffer = readFileSync(iconPath);
    return `data:image/png;base64,${iconBuffer.toString('base64')}`;
  } catch {
    return undefined;
  }
}

export default function OgImage() {
  const iconSrc = getIconDataUrl();

  return new ImageResponse(
    <OgTemplate
      title="Privacy Policy"
      description="No tracking. No servers. Your email stays in your browser — never shared with anyone."
      badgeText="Zero data collection · Local storage only"
      iconSrc={iconSrc}
    />,
    { ...size },
  );
}
