import type { WorldSkill } from '../types/hero';

interface WorldSkillListProps {
  worldSkills: WorldSkill[];
}

export function WorldSkillList({ worldSkills }: WorldSkillListProps) {
  return (
    <div className="world-skill-list">
      {worldSkills.map((skill) => (
        <section className="world-skill" key={skill.slot}>
          <h3 className="world-skill__title">世界技能 {skill.slot}</h3>
          <p>{skill.description}</p>
        </section>
      ))}
    </div>
  );
}
