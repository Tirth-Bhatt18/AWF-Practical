function Skills({ skillList }) {
    return (
        <div className="card skills-card" id="skills">
            <h2>Technical Skills</h2>
            <div className="skills-badge-list">
                {skillList.map((skill) => (
                    <span key={skill} className="skill-chip">
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default Skills;