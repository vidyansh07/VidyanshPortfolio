import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
// About Section with Psychology-Driven Design
const About = () => {
    const achievements = [
      { label: 'Years Experience', value: '4+', icon: '⏳' },
      { label: 'Projects Completed', value: '50+', icon: '🎯' },
      { label: 'Happy Clients', value: '20+', icon: '😊' },
      { label: 'Support', value: '24/7', icon: '🔧' }
    ];
  
    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src="https://images.pexels.com/photos/27660068/pexels-photo-27660068/free-photo-of-a-man-with-a-backpack-standing-on-a-mountain-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Profile"
                  className="rounded-2xl shadow-2xl"
                />
                <motion.div
                  className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 flex items-center space-x-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-3xl">👨‍💻</span>
                  <div>
                    <p className="font-semibold">4+ Years</p>
                    <p className="text-sm text-gray-600">of Experience</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
  
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl font-bold mb-4">Transforming Ideas into Digital Reality</h2>
                <p className="text-gray-600 leading-relaxed">
                  As a passionate full-stack developer, I bridge the gap between design and functionality. 
                  My approach combines technical expertise with creative problem-solving to deliver 
                  exceptional digital experiences that drive results.
                </p>
              </div>
  
              <div className="grid grid-cols-2 gap-6">
                {achievements.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-gray-50 rounded-lg p-4 text-center hover:shadow-md transition-shadow"
                  >
                    <span className="text-2xl mb-2 block">{item.icon}</span>
                    <p className="font-bold text-xl mb-1">{item.value}</p>
                    <p className="text-gray-600 text-sm">{item.label}</p>
                  </motion.div>
                ))}
              </div>
  
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download size={20} />
                <span><a href="/docs/vidyansh-latest-resume.pdf" download="vidyansh-latest-resume.pdf">Download Resume</a></span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
    );
  };

export default About;