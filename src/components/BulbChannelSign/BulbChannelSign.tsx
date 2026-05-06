import React, { useMemo } from 'react';
import BulbChannelLetter from './BulbChannelLetter';
import './BulbChannelSign.css';

export interface BulbChannelSignProps {
  brandText?: string;
  subtitle: string;
  withDividerLights?: boolean;
}

const BulbChannelSign: React.FC<BulbChannelSignProps> = ({
  brandText = 'GAVPLA',
  subtitle,
  withDividerLights = false,
}) => {
  const letters = useMemo(() => brandText.toUpperCase().split(''), [brandText]);

  const ariaLabel = useMemo(
    () => `${brandText}. ${subtitle}`,
    [brandText, subtitle],
  );

  const topStripCount = 18;
  const TopRimLights = (
    !withDividerLights ? undefined :
    <div className="BulbChannelSign-topRim" aria-hidden>
            {Array.from({ length: topStripCount }, (_, i) => (
              <span
                key={`strip-${i.toString()}`}
                className="BulbChannelSign-bulb"
                style={{
                  animationDelay: `${(i * 0.055).toFixed(3)}s`,
                }}
              />
            ))}
          </div>
  )

  return (
    <div className="BulbChannelSign" role="img" aria-label={ariaLabel}>
      <div className="BulbChannelSign-mount">
        <div className="BulbChannelSign-chassis">
          {TopRimLights}
          <div className="BulbChannelSign-letters" aria-hidden>
            {letters.map((ch, li) => (
              <BulbChannelLetter key={`${li.toString()}-${ch}`} letter={ch} letterIndex={li} />
            ))}
          </div>
          {TopRimLights}
          <p className="BulbChannelSign-subtitle">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default BulbChannelSign;
