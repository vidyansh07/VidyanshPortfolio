
import { motion } from 'framer-motion';

// Skills Section with Psychology-Driven Design
const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      description: 'Creating intuitive user experiences',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux'],
      icon: '🎨',
      color: 'bg-blue-500'
    },
    {
      title: 'Backend Development',
      description: 'Building robust server architectures',
      skills: ['Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'MongoDB'],
      icon: '⚙️',
      color: 'bg-green-500'
    },
    {
      title: 'Mobile Development',
      description: 'Crafting native mobile experiences',
      skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Firebase'],
      icon: '📱',
      color: 'bg-purple-500'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Technical Expertise</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Leveraging cutting-edge technologies to create impactful solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-2xl`}>
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
              <p className="text-gray-600 mb-4 text-sm">{category.description}</p>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1, delay: skillIndex * 0.1 }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{skill}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${category.color} opacity-75`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${85 + (skillIndex * 3)}%` }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;