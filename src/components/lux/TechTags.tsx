import React, { useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import type { FeaturedProject } from "../../data/featuredProjects";
import styles from "./TechTags.module.scss";

/** Tecnologias do projeto como etiquetas, agrupadas por camada (telas, servidor, banco, publicação). */
const TechTags: React.FC<{ project: FeaturedProject }> = ({ project }) => {
  const { data } = useContext(LanguageContext);
  const labels = data.lux.work.techLabels;
  const groups = project.tech ?? [{ group: "back" as const, items: project.stack }];

  return (
    <dl className={styles.groups}>
      {groups.map(({ group, items }) => (
        <div key={group} className={`${styles.group} ${group === "before" ? styles.before : ""}`}>
          <dt>{group === "back" && !project.tech ? data.lux.caseStudy.stack : labels[group]}</dt>
          <dd>
            <ul>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  );
};

export default TechTags;
