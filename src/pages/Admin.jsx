import React, { useState, useRef } from 'react';
import { useData } from '../context/DataContext';

// Reusable Image Upload Component
const ImageUpload = ({ value, onChange, label }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.url) {
        onChange(data.url);
      } else {
        alert('Upload gagal');
      }
    } catch (err) {
      console.error(err);
      alert('Upload error');
    } finally {
      setUploading(false);
      // Reset input so the same file can be uploaded again if needed
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: '#333', fontSize: '0.9rem' }}>{label}</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
        <input 
          type="text" 
          value={value || ''} 
          onChange={(e) => onChange(e.target.value)} 
          style={{ flex: '1 1 200px', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '6px', fontSize: '1rem' }} 
          placeholder="Atau paste URL dari internet..." 
        />
        <span style={{ fontSize: '0.8rem', color: '#666', fontWeight: 'bold' }}>ATAU</span>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleUpload} 
          ref={fileInputRef}
          style={{ display: 'none' }} 
        />
        <button 
          type="button" 
          onClick={() => fileInputRef.current.click()}
          style={{ flex: '1 1 auto', padding: '0.75rem 1.5rem', background: '#e5e7eb', color: '#1f2937', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
        >
          {uploading ? 'Mengunggah...' : 'Upload File'}
        </button>
      </div>
      {value && <img src={value} alt="Preview" style={{ height: '100px', marginTop: '0.75rem', borderRadius: '8px', objectFit: 'cover' }} />}
    </div>
  );
};

function Admin() {
  const { data, updateData, saveToServer } = useData();
  const [activeTab, setActiveTab] = useState('hero');

  const handleHeroChange = (e) => {
    updateData('hero', { ...data.hero, [e.target.name]: e.target.value });
  };

  const handleAboutChange = (e) => {
    updateData('about', { ...data.about, [e.target.name]: e.target.value });
  };

  // --- Experience Handlers ---
  const handleExperienceChange = (index, field, value) => {
    const newExp = [...data.experience];
    newExp[index][field] = value;
    updateData('experience', newExp);
  };
  
  const handleExperienceDescChange = (index, descIndex, value) => {
    const newExp = [...data.experience];
    newExp[index].desc[descIndex] = value;
    updateData('experience', newExp);
  };

  const addExperience = () => {
    const newExp = [...data.experience, { id: Date.now(), type: 'Pekerjaan', date: '', title: '', company: '', desc: [''], img: '' }];
    updateData('experience', newExp);
  };

  const removeExperience = (index) => {
    const newExp = [...data.experience];
    newExp.splice(index, 1);
    updateData('experience', newExp);
  };

  // --- Project Handlers ---
  const handleProjectChange = (index, field, value) => {
    const newProj = [...data.projects];
    newProj[index][field] = value;
    updateData('projects', newProj);
  };

  const addProject = () => {
    const newProj = [...data.projects, { id: Date.now(), title: '', desc: '', category: 'Web', img: '' }];
    updateData('projects', newProj);
  };

  const removeProject = (index) => {
    const newProj = [...data.projects];
    newProj.splice(index, 1);
    updateData('projects', newProj);
  };

  // --- Gallery Handlers ---
  const handleGalleryChange = (index, url) => {
    const newGallery = [...(data.gallery || [])];
    newGallery[index] = url;
    updateData('gallery', newGallery);
  };

  const addGalleryImage = () => {
    const newGallery = [...(data.gallery || []), ""];
    updateData('gallery', newGallery);
  };

  const removeGalleryImage = (index) => {
    const newGallery = [...(data.gallery || [])];
    newGallery.splice(index, 1);
    updateData('gallery', newGallery);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const success = await saveToServer();
    if (success) {
      alert("Perubahan berhasil disimpan permanen ke database lokal (data.json)!");
    } else {
      alert("Gagal menyimpan perubahan. Pastikan server lokal berjalan.");
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif', background: '#f5f5f5', color: '#1a1a1a' }}>
      
      {/* Sidebar */}
      <div style={{ width: '250px', background: '#0a0a0a', color: '#fff', padding: '2rem 1rem', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ marginBottom: '2rem', textAlign: 'center', fontSize: '1.5rem', fontWeight: 800 }}>Admin Panel</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          {['hero', 'about', 'experience', 'projects', 'gallery'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '1rem',
                textAlign: 'left',
                background: activeTab === tab ? '#333' : 'transparent',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                borderRadius: '8px',
                textTransform: 'capitalize'
              }}
            >
              {tab} Section
            </button>
          ))}
          <a href="/" style={{ marginTop: 'auto', textAlign: 'center', color: '#888', textDecoration: 'none', padding: '1rem' }}>&larr; Lihat Website</a>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '3rem 4rem', overflowY: 'auto', maxHeight: '100vh' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '2rem', textTransform: 'capitalize' }}>Edit Konten: {activeTab}</h1>
        
        <form onSubmit={handleSave} style={{ background: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          
          {activeTab === 'hero' && (
            <>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>Judul Utama (Gunakan \n untuk baris baru)</label>
                <textarea name="title" rows={3} value={data.hero.title || ''} onChange={handleHeroChange} style={inputStyle} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>Sub-judul</label>
                <textarea name="subtitle" rows={2} value={data.hero.subtitle || ''} onChange={handleHeroChange} style={inputStyle} />
              </div>
              
              <ImageUpload 
                label="Foto Latar Belakang (Background Hero)"
                value={data.hero.bgImg}
                onChange={(url) => updateData('hero', { ...data.hero, bgImg: url })}
              />
            </>
          )}

          {activeTab === 'about' && (
            <>
              <ImageUpload 
                label="Foto Profil (Tentang Saya)"
                value={data.about.img}
                onChange={(url) => updateData('about', { ...data.about, img: url })}
              />

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>Nama Lengkap</label>
                <input type="text" name="name" value={data.about.name || ''} onChange={handleAboutChange} style={inputStyle} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>Tanggal Lahir</label>
                <input type="text" name="dob" value={data.about.dob || ''} onChange={handleAboutChange} style={inputStyle} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>Domisili</label>
                <input type="text" name="location" value={data.about.location || ''} onChange={handleAboutChange} style={inputStyle} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>Email</label>
                <input type="email" name="email" value={data.about.email || ''} onChange={handleAboutChange} style={inputStyle} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>Deskripsi Panjang</label>
                <textarea name="description" rows={5} value={data.about.description || ''} onChange={handleAboutChange} style={inputStyle} />
              </div>
            </>
          )}

          {activeTab === 'experience' && (
            <div>
              {data.experience.map((exp, idx) => (
                <div key={exp.id} style={{ padding: '1.5rem', border: '1px solid #eee', borderRadius: '8px', marginBottom: '1.5rem', background: '#fafafa' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0 }}>Pengalaman #{idx + 1}</h3>
                    <button type="button" onClick={() => removeExperience(idx)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>Hapus</button>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={labelStyle}>Tipe (Pekerjaan / Pendidikan)</label>
                      <select value={exp.type || ''} onChange={(e) => handleExperienceChange(idx, 'type', e.target.value)} style={inputStyle}>
                        <option value="Pekerjaan">Pekerjaan</option>
                        <option value="Pendidikan">Pendidikan</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Tahun / Tanggal</label>
                      <input type="text" value={exp.date || ''} onChange={(e) => handleExperienceChange(idx, 'date', e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Jabatan / Gelar</label>
                      <input type="text" value={exp.title || ''} onChange={(e) => handleExperienceChange(idx, 'title', e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Perusahaan / Institusi</label>
                      <input type="text" value={exp.company || ''} onChange={(e) => handleExperienceChange(idx, 'company', e.target.value)} style={inputStyle} />
                    </div>
                  </div>

                  <div style={{ marginTop: '1rem' }}>
                    <label style={labelStyle}>Deskripsi (Poin-poin)</label>
                    {exp.desc.map((d, dIdx) => (
                      <input 
                        key={dIdx} 
                        type="text" 
                        value={d} 
                        onChange={(e) => handleExperienceDescChange(idx, dIdx, e.target.value)} 
                        style={{...inputStyle, marginBottom: '0.5rem'}} 
                      />
                    ))}
                    <button type="button" onClick={() => handleExperienceChange(idx, 'desc', [...exp.desc, ''])} style={{ background: '#ddd', border: 'none', padding: '0.25rem 0.75rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>+ Tambah Poin</button>
                  </div>

                  <div style={{ marginTop: '1.5rem' }}>
                    <ImageUpload 
                      label="Foto Dokumentasi (Opsional)"
                      value={exp.img}
                      onChange={(url) => handleExperienceChange(idx, 'img', url)}
                    />
                  </div>
                </div>
              ))}
              <button type="button" onClick={addExperience} style={{ width: '100%', padding: '1rem', background: '#f0fdf4', color: '#166534', border: '2px dashed #bbf7d0', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                + Tambah Pengalaman Baru
              </button>
            </div>
          )}

          {activeTab === 'projects' && (
            <div>
              {data.projects.map((proj, idx) => (
                <div key={proj.id} style={{ padding: '1.5rem', border: '1px solid #eee', borderRadius: '8px', marginBottom: '1.5rem', background: '#fafafa' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0 }}>Proyek #{idx + 1}</h3>
                    <button type="button" onClick={() => removeProject(idx)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }}>Hapus</button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={labelStyle}>Nama Proyek</label>
                      <input type="text" value={proj.title || ''} onChange={(e) => handleProjectChange(idx, 'title', e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Kategori</label>
                      <select value={proj.category || ''} onChange={(e) => handleProjectChange(idx, 'category', e.target.value)} style={inputStyle}>
                        <option value="Web">Web</option>
                        <option value="Mobile">Mobile</option>
                        <option value="Desain">Desain</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginTop: '1rem' }}>
                    <label style={labelStyle}>Deskripsi Proyek</label>
                    <textarea rows={3} value={proj.desc || ''} onChange={(e) => handleProjectChange(idx, 'desc', e.target.value)} style={inputStyle} />
                  </div>

                  <div style={{ marginTop: '1.5rem' }}>
                    <ImageUpload 
                      label="Foto Proyek"
                      value={proj.img}
                      onChange={(url) => handleProjectChange(idx, 'img', url)}
                    />
                  </div>
                </div>
              ))}
              <button type="button" onClick={addProject} style={{ width: '100%', padding: '1rem', background: '#eff6ff', color: '#1e40af', border: '2px dashed #bfdbfe', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                + Tambah Proyek Baru
              </button>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div>
              <p style={{ color: '#666', marginBottom: '1.5rem' }}>Unggah momen, foto ruang kerja, atau presentasi Anda untuk ditampilkan di bagian Galeri Visual.</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                {(data.gallery || []).map((imgUrl, idx) => (
                  <div key={idx} style={{ padding: '1rem', border: '1px solid #eee', borderRadius: '8px', background: '#fafafa', position: 'relative' }}>
                    <button type="button" onClick={() => removeGalleryImage(idx)} style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: '#ef4444', color: '#fff', border: 'none', width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>&times;</button>
                    
                    <h4 style={{ margin: '0 0 1rem 0' }}>Foto #{idx + 1}</h4>
                    <ImageUpload 
                      label=""
                      value={imgUrl}
                      onChange={(url) => handleGalleryChange(idx, url)}
                    />
                  </div>
                ))}
              </div>
              
              <button type="button" onClick={addGalleryImage} style={{ width: '100%', padding: '1rem', background: '#fef3c7', color: '#92400e', border: '2px dashed #fde68a', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                + Tambah Slot Foto Galeri
              </button>
            </div>
          )}

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', position: 'sticky', bottom: '0', background: '#fff', padding: '1rem 0', borderTop: '1px solid #eee', zIndex: 10 }}>
            <button type="submit" style={{ padding: '0.8rem 2rem', background: '#0a0a0a', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
              Simpan Perubahan Permanen
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}

const labelStyle = { display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', color: '#333', fontSize: '0.9rem' };
const inputStyle = { width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '6px', fontSize: '1rem', background: '#fff' };

export default Admin;
