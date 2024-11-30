const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-12 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Portfolio
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Building amazing web experiences with modern technologies and 
                a passion for creating innovative solutions.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'About', 'Skills', 'Projects', 'Contact'].map(link => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-gray-400 hover:text-primary transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                {[
                  // { Icon: GitHub, href: '#', label: 'GitHub' },
                  // { Icon: Linkedin, href: '#', label: 'LinkedIn' },
                  // { Icon: Twitter, href: '#', label: 'Twitter' }
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="p-2 bg-gray-800 rounded-lg hover:bg-primary/20 transition-colors duration-200"
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© {currentYear} Your Name. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };

export default Footer;