import type { CSSProperties } from 'react';
import { factionLabels, positionLabels, rarityLabels, tacticalRoleLabels } from '../data/labels';
import type { Hero } from '../types/hero';
import { WorldSkillList } from './WorldSkillList';

const factionAccents = {
  truth: '#5B7FD4',
  prowess: '#B15BFF',
  passion: '#FF7575',
  wealth: '#FFFF6F',
  glory: '#96FED1',
} as const;

const rarityAccents = {
  ur: '#B14C8A',
  ssr: '#D4A843',
  sr: '#9900FF',
  r: '#00FFFF',
} as const;

interface HeroCardProps {
  hero: Hero;
  partnerNames: string[];
}

type CustomProperties = CSSProperties & Record<'--accent' | '--rarity', string>;

export function HeroCard({ hero, partnerNames }: HeroCardProps) {
  const accent = factionAccents[hero.faction];
  const cardStyle = { '--accent': accent } as CustomProperties;
  const rarityStyle = { '--rarity': rarityAccents[hero.rarity] } as CustomProperties;

  return (
    <article className="hero-card" style={cardStyle}>
      <div className="hero-card__top">
        <h2 className="hero-card__name">{hero.name}</h2>
        <span className="hero-card__rarity" style={rarityStyle}>{rarityLabels[hero.rarity]}</span>
      </div>

      <div className="hero-card__meta">
        <p>
          <span className="hero-card__meta-label">陣營</span>
          <span className="faction-tag">{factionLabels[hero.faction]}</span>
        </p>
        <p className="hero-card__roles">
          <span className="hero-card__meta-label">定位</span>
          {hero.positions.map((position) => (
            <span key={position} className="role-tag">{positionLabels[position]}</span>
          ))}
        </p>
        {hero.tacticalRoles.length > 0 && (
          <p className="hero-card__roles">
            <span className="hero-card__meta-label">戰術</span>
            {hero.tacticalRoles.map((role) => (
              <span key={role} className="role-tag role-tag--tactical">{tacticalRoleLabels[role]}</span>
            ))}
          </p>
        )}
      </div>

      <div className="hero-card__effects">
        <span className="hero-card__effects-label">
          世界技能 <span className="mono">({hero.worldSkills.length})</span>
        </span>
        <WorldSkillList worldSkills={hero.worldSkills} />
      </div>

      {partnerNames.length > 0 && (
        <p className="hero-card__synergy"><strong>搭檔</strong> {partnerNames.join('、')}</p>
      )}

      <div className="hero-card__tags">
        {hero.tags.map((tag) => <span key={tag} className="tag-pill">#{tag}</span>)}
      </div>
    </article>
  );
}
