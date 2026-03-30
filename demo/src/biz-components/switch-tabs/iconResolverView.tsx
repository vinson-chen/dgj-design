import React from 'react';
import { DgjIcon } from 'dgj-design';
import { iconTypes } from '../../demos/iconTypes';

const iconTypeSet = new Set(iconTypes.map((v) => v.toLowerCase()));
const storeLogoLoaders = import.meta.glob('../../../../store_logo/*.{jpg,png,gif}', {
  import: 'default',
}) as Record<string, () => Promise<string>>;

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, '-');
}

function parseIcon(value?: string): { kind: 'svg' | 'img' | 'none'; name?: string } {
  if (!value) return { kind: 'none' };
  const raw = normalize(value);
  const ext = raw.match(/\.(svg|png|jpg|jpeg|gif)$/i)?.[1]?.toLowerCase();
  if (!ext) return { kind: 'svg', name: raw };
  if (ext === 'svg') return { kind: 'svg', name: raw.replace(/\.svg$/i, '') };
  return { kind: 'img', name: raw.replace(/\.(png|jpg|jpeg|gif)$/i, '') };
}

export function renderSwitchTabIcon(icon?: string): React.ReactNode {
  const parsed = parseIcon(icon);
  if (parsed.kind === 'none' || !parsed.name) return null;

  if (parsed.kind === 'svg') {
    const iconType = iconTypeSet.has(parsed.name) ? parsed.name : 'help-circle';
    return <DgjIcon type={iconType} fontSize={16} />;
  }

  return <StoreLogoIcon name={parsed.name} />;
}

function pickStoreLogoLoader(name: string): (() => Promise<string>) | undefined {
  const lower = name.toLowerCase();
  return (
    storeLogoLoaders[`../../../../store_logo/${lower}.jpg`] ??
    storeLogoLoaders[`../../../../store_logo/${lower}.png`] ??
    storeLogoLoaders[`../../../../store_logo/${lower}.gif`]
  );
}

function StoreLogoIcon({ name }: { name: string }) {
  const [src, setSrc] = React.useState<string | null>(null);

  React.useEffect(() => {
    let alive = true;
    const loader = pickStoreLogoLoader(name) ?? pickStoreLogoLoader('otherstore');
    if (!loader) {
      setSrc(null);
      return () => {
        alive = false;
      };
    }

    loader()
      .then((url) => {
        if (alive) setSrc(url);
      })
      .catch(() => {
        if (!alive) return;
        const fallback = pickStoreLogoLoader('otherstore');
        if (!fallback) {
          setSrc(null);
          return;
        }
        fallback()
          .then((url) => {
            if (alive) setSrc(url);
          })
          .catch(() => {
            if (alive) setSrc(null);
          });
      });

    return () => {
      alive = false;
    };
  }, [name]);

  if (!src) return <DgjIcon type="help-circle" fontSize={16} />;
  return <img src={src} alt={name} width={16} height={16} style={{ borderRadius: 4, display: 'block' }} />;
}
