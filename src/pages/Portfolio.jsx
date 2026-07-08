import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { useData } from '../context/DataContext';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', damping: 20, stiffness: 80, mass: 0.8 } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
  }
};

function Portfolio() {
  const { data } = useData();
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [visibleCount, setVisibleCount] = useState(3);

  const filteredProjects = data.projects.filter(project => {
    if (activeFilter === 'Semua') return true;
    return project.category === activeFilter;
  });

  const displayedProjects = filteredProjects.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 3);
  };

  const handleDownloadCV = () => {
    alert("Ini adalah tombol simulasi. Nantinya tombol ini akan otomatis mengunduh file PDF CV/Resume asli Anda.");
  };

  return (
    <>
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="navbar section-dark"
      >
        <div className="logo">Portofolio.</div>
        <div className="nav-links">
          <motion.a whileHover={{ scale: 1.1, color: '#fff' }} whileTap={{ scale: 0.9 }} href="#home">Beranda</motion.a>
          <motion.a whileHover={{ scale: 1.1, color: '#fff' }} whileTap={{ scale: 0.9 }} href="#about">Tentang</motion.a>
          <motion.a whileHover={{ scale: 1.1, color: '#fff' }} whileTap={{ scale: 0.9 }} href="#resume">Pengalaman</motion.a>
          <motion.a whileHover={{ scale: 1.1, color: '#fff' }} whileTap={{ scale: 0.9 }} href="#skills">Keahlian</motion.a>
          <motion.a whileHover={{ scale: 1.1, color: '#fff' }} whileTap={{ scale: 0.9 }} href="#projects">Karya</motion.a>
          <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#contact" className="btn btn-pill" style={{ marginLeft: '1rem' }}>Hubungi Saya</motion.a>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="hero section-dark">
        <motion.div 
          className="hero-image-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} perspective={1000} scale={1.05} transitionSpeed={3000} style={{ width: '100%', height: '100%' }}>
            <img src={data.hero.bgImg || "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"} alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }} />
            <div className="hero-overlay"></div>
          </Tilt>
        </motion.div>

        <motion.div 
          className="hero-title-container"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 variants={fadeInUp} className="hero-title" style={{ whiteSpace: 'pre-line' }}>
            {data.hero.title}
          </motion.h1>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="hero-subtitle"
        >
          {data.hero.subtitle}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="hero-btns"
        >
          <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#projects" className="btn btn-primary">
            Lihat Karya Saya &rarr;
          </motion.a>
          <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="#about" className="btn btn-outline-dark">
            Pelajari Lebih Lanjut
          </motion.a>
        </motion.div>

        <div className="marquee-container">
          <div className="marquee-content">
            <span>WEB DEVELOPMENT</span>
            <span>MOBILE APPS</span>
            <span>SYSTEM DESIGN</span>
            <span>PROTOTYPING</span>
            <span>USER INTERFACE</span>
            <span>WEB DEVELOPMENT</span>
            <span>MOBILE APPS</span>
            <span>SYSTEM DESIGN</span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-light py-20">
        <div className="container about-grid">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="about-subtitle">Tentang Saya</motion.div>
            <motion.h2 variants={fadeInUp} className="about-title">Halo, Saya {data.about.name.split(' ')[0]}</motion.h2>
            <motion.p variants={fadeInUp} className="about-desc">
              {data.about.description}
            </motion.p>
            
            {/* Personal Details */}
            <motion.div variants={fadeInUp} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem', fontSize: '0.95rem' }}>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Nama Lengkap</strong>
                <span>{data.about.name}</span>
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Tanggal Lahir</strong>
                <span>{data.about.dob}</span>
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Domisili</strong>
                <span>{data.about.location}</span>
              </div>
              <div>
                <strong style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Email</strong>
                <span>{data.about.email}</span>
              </div>
            </motion.div>
            
            <motion.button 
              onClick={handleDownloadCV}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn" 
              style={{ background: '#0a0a0a', color: '#fff', border: 'none' }}
            >
              Unduh CV (Resume) &rarr;
            </motion.button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} glareEnable={true} glareMaxOpacity={0.2} glarePosition="all" transitionSpeed={1000} className="about-image" style={{ transformStyle: 'preserve-3d' }}>
              <img src={data.about.img || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} alt="About Profile" style={{ width: '100%', display: 'block' }} />
            </Tilt>
          </motion.div>
        </div>
      </section>

      {/* Resume Section (Experience & Education) */}
      <section id="resume" className="section-light-alt py-20 overflow-hidden">
        <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="section-header"
          >
            <div className="sub">Perjalanan Karir & Akademik</div>
            <h2>Pengalaman & Pendidikan</h2>
          </motion.div>
          
          <div className="timeline">
            {data.experience.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="timeline-item"
              >
                <div className="timeline-date">
                  <span className="date-badge" style={{ background: item.type === 'Pendidikan' ? '#3b82f6' : '#0a0a0a' }}>
                    {item.date}
                  </span>
                </div>
                <div className="timeline-dot" style={{ background: item.type === 'Pendidikan' ? '#3b82f6' : '#0a0a0a' }}></div>
                <div className="timeline-content">
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: item.type === 'Pendidikan' ? '#3b82f6' : '#666', fontWeight: 600, marginBottom: '0.25rem' }}>{item.type}</div>
                  <h3>{item.title}</h3>
                  <div className="company">{item.company}</div>
                  <ul>
                    {item.desc.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                  {item.img && (
                    <motion.div style={{ marginTop: '1.5rem', borderRadius: '12px', overflow: 'hidden' }}>
                      <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.02} transitionSpeed={800} glareEnable={true} glareMaxOpacity={0.1}>
                        <img src={item.img} alt={item.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
                      </Tilt>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Arsenal (Skills) */}
      <section id="skills" className="section-light py-20">
        <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="section-header"
          >
            <h2>Keahlian Teknis</h2>
            <div className="sub" style={{textTransform:'none', marginTop:'0.5rem'}}>Alat dan teknologi yang saya gunakan sehari-hari.</div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="arsenal-grid"
          >
            {[
              { title: "Frontend", icons: ["React", "Vue", "Next.js"], desc: "Pembuatan antarmuka responsif dan modern." },
              { title: "Backend", icons: ["Node.js", "Laravel", "MySQL"], desc: "Arsitektur server, API, dan pengelolaan basis data." },
              { title: "Mobile", icons: ["Flutter", "Kotlin", "Swift"], desc: "Aplikasi cross-platform untuk Android & iOS." },
              { title: "Desain & Tools", icons: ["Figma", "Git", "Docker"], desc: "Prototyping UI/UX dan version control." },
            ].map((arsenal, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp} 
              >
                <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.02} transitionSpeed={600} className="arsenal-card">
                  <h4>{arsenal.title}</h4>
                  <div className="icons-flex" style={{ gap: '0.5rem' }}>
                    {arsenal.icons.map((icon, i) => (
                      <div key={i} style={{ background: 'var(--bg-light-alt)', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 }}>
                        {icon}
                      </div>
                    ))}
                  </div>
                  <p style={{ marginTop: '1rem' }}>{arsenal.desc}</p>
                </Tilt>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section-light-alt py-20">
        <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="section-header"
          >
            <h2>Koleksi Proyek</h2>
            <div className="sub" style={{textTransform:'none', marginTop:'0.5rem'}}>Beberapa proyek terbaik yang pernah saya kerjakan.</div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="filter-tabs"
          >
            {['Semua', 'Web', 'Mobile', 'Desain'].map(filter => (
              <motion.button 
                key={filter}
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }} 
                onClick={() => {
                  setActiveFilter(filter);
                  setVisibleCount(3); // reset count on filter change
                }}
                className={`filter-tab ${activeFilter === filter ? 'active' : ''}`}
              >
                {filter}
              </motion.button>
            ))}
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="projects-grid"
          >
            {displayedProjects.length > 0 ? displayedProjects.map((project) => (
              <motion.div 
                key={project.id}
                variants={fadeInUp}
                layout // adds smooth sorting animation
              >
                <Tilt tiltMaxAngleX={12} tiltMaxAngleY={12} glareEnable={true} glareMaxOpacity={0.15} scale={1.03} transitionSpeed={800} className="project-card">
                  <div style={{ overflow: 'hidden' }}>
                    <img 
                      src={project.img} 
                      alt={project.title} 
                      className="project-img" 
                    />
                  </div>
                  <div className="project-info">
                    <h4>{project.title}</h4>
                    <p>{project.desc}</p>
                    <span style={{ display: 'inline-block', marginTop: '1rem', fontSize: '0.75rem', padding: '0.2rem 0.6rem', background: 'var(--bg-light-alt)', borderRadius: '9999px', fontWeight: 'bold' }}>{project.category}</span>
                  </div>
                </Tilt>
              </motion.div>
            )) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)', padding: '3rem 0' }}>Belum ada proyek di kategori ini.</div>
            )}
          </motion.div>
          
          {visibleCount < filteredProjects.length && (
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{ textAlign: 'center', marginTop: '3rem' }}
            >
              <motion.button 
                onClick={handleLoadMore}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn" 
                style={{ background: '#0a0a0a', color: '#fff', border: 'none' }}
              >
                Muat Lebih Banyak &rarr;
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Visual Chronicles (Gallery) */}
      <section className="section-light py-20">
        <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="section-header"
          >
            <h2>Galeri Visual</h2>
            <div className="sub" style={{textTransform:'none', marginTop:'0.5rem'}}>Kumpulan momen, ruang kerja, dan presentasi selama berkarir.</div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}
          >
            {(data.gallery || [
              "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", 
              "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", 
              "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80", 
              "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"  
            ]).map((img, idx) => (
              <motion.div 
                key={idx}
                variants={scaleUp}
                style={{ borderRadius: '12px', overflow: 'hidden', height: '200px', transformStyle: 'preserve-3d' }}
              >
                <Tilt tiltMaxAngleX={20} tiltMaxAngleY={20} scale={1.05} transitionSpeed={600} glareEnable={true} glareMaxOpacity={0.2} style={{ width: '100%', height: '100%' }}>
                  <img src={img} alt={`Gallery ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Tilt>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer id="contact" className="footer-cta overflow-hidden">
        <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="footer-grid"
          >
            <motion.div variants={fadeInUp}>
              <div style={{ display: 'inline-block', background: 'rgba(0,255,0,0.1)', color: '#4ade80', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
                ● Tersedia untuk kolaborasi
              </div>
              <h2>Mari Buat<br />Sesuatu yang<br />Luar Biasa.</h2>
              <motion.a 
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
                href="mailto:halo@wira.works" 
                className="contact-email"
              >
                halo@wira.works
              </motion.a>
              <p style={{ color: '#a3a3a3', fontSize: '0.9rem', marginTop: '1rem' }}>
                📍 Jakarta, Indonesia
              </p>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <div className="footer-links">
                <div className="footer-column">
                  <h5>Navigasi</h5>
                  <a href="#home">Beranda</a>
                  <a href="#about">Tentang Saya</a>
                  <a href="#resume">Pengalaman</a>
                  <a href="#projects">Proyek</a>
                </div>
                <div className="footer-column">
                  <h5>Sosial Media</h5>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <div className="footer-bottom">
            <div style={{fontSize: '1.5rem', fontWeight: 800, color: '#fff'}}>Portofolio.</div>
            <div>© {new Date().getFullYear()} Aditya Wirayudha. Hak Cipta Dilindungi.</div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Portfolio;
