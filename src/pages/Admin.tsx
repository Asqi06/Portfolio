import { useState, useRef } from 'react';
import { useAdmin } from '../context/AdminContext';
import { ProjectData } from '../data/projects';
import { ArrowLeft, Plus, Save, Trash2, Image as ImageIcon, Upload, Link as LinkIcon, Settings, Layout, Briefcase, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Admin() {
  const { content, updateContent, addProject, updateProject, deleteProject } = useAdmin();
  
  const [activeTab, setActiveTab] = useState<'general' | 'projects' | 'footer' | 'cloudinary'>('general');
  
  // General Site State
  const [heroLine1, setHeroLine1] = useState(content.heroLine1);
  const [heroLine2, setHeroLine2] = useState(content.heroLine2);
  const [heroAccent, setHeroAccent] = useState(content.heroAccent);
  const [aboutText, setAboutText] = useState(content.aboutText);
  
  // Cloudinary State
  const [cloudName, setCloudName] = useState(content.cloudinaryCloudName);
  const [uploadPreset, setUploadPreset] = useState(content.cloudinaryUploadPreset);

  // Footer State
  const [footerTagline, setFooterTagline] = useState(content.footerTagline);

  // Project State
  const [isAdding, setIsAdding] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState<Partial<ProjectData>>({});
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleCloudinaryUpload = async (file: File): Promise<string | null> => {
    if (!content.cloudinaryCloudName || !content.cloudinaryUploadPreset) {
      alert("Please configure your Cloudinary Cloud Name and Upload Preset first!");
      return null;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', content.cloudinaryUploadPreset);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${content.cloudinaryCloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || "Upload failed");
      }

      setIsUploading(false);
      return data.secure_url;
    } catch (error: any) {
      console.error("Upload failed:", error);
      setIsUploading(false);
      alert(`Cloudinary Upload Error: ${error.message}. \n\nIMPORTANT: Make sure your Upload Preset is set to 'Unsigned' in your Cloudinary Settings -> Upload tab.`);
      return null;
    }
  };

  const handleSaveGeneral = () => {
    updateContent({ heroLine1, heroLine2, heroAccent, aboutText });
    alert("General settings saved!");
  };

  const handleSaveCloudinary = () => {
    updateContent({ cloudinaryCloudName: cloudName, cloudinaryUploadPreset: uploadPreset });
    alert("Cloudinary settings saved!");
  };

  const handleSaveFooter = () => {
    updateContent({ footerTagline });
    alert("Footer settings saved!");
  };

  const handleAddProject = () => {
    if (projectForm.id && projectForm.title) {
      const projectToSave = {
        ...projectForm,
        gallery: projectForm.gallery || []
      } as ProjectData;
      addProject(projectToSave);
      setIsAdding(false);
      setProjectForm({});
    } else {
      alert('ID and Title are required');
    }
  };

  const handleUpdateProject = () => {
    if (editingProjectId && projectForm.title) {
      const projectToSave = {
        ...projectForm,
        gallery: projectForm.gallery || []
      } as ProjectData;
      updateProject(editingProjectId, projectToSave);
      setEditingProjectId(null);
      setProjectForm({});
    }
  };

  const openEditProject = (proj: ProjectData) => {
    setEditingProjectId(proj.id);
    setProjectForm(proj);
    setIsAdding(false);
    setActiveTab('projects');
  };

  const handleGalleryUpload = async (file: File) => {
    const url = await handleCloudinaryUpload(file);
    if (url) {
      setProjectForm(prev => ({
        ...prev,
        gallery: [...(prev.gallery || []), url]
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8 font-sans pt-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-white/5 pb-8">
          <div>
            <Link to="/" className="inline-flex items-center text-gray-500 hover:text-white mb-2 transition-colors text-sm">
              <ArrowLeft className="w-4 h-4 mr-2" /> View Portfolio
            </Link>
            <h1 className="text-4xl font-serif italic text-brand-accent">Studio Control</h1>
          </div>
          
          <div className="flex bg-[#111] p-1 rounded-lg border border-white/5 overflow-x-auto no-scrollbar">
            <button onClick={() => setActiveTab('general')} className={`px-4 py-2 rounded-md text-xs tracking-widest uppercase flex items-center transition-all ${activeTab === 'general' ? 'bg-brand-accent text-white' : 'text-gray-500 hover:text-white'}`}>
              <Layout className="w-3 h-3 mr-2" /> Content
            </button>
            <button onClick={() => setActiveTab('projects')} className={`px-4 py-2 rounded-md text-xs tracking-widest uppercase flex items-center transition-all ${activeTab === 'projects' ? 'bg-brand-accent text-white' : 'text-gray-500 hover:text-white'}`}>
              <Briefcase className="w-3 h-3 mr-2" /> Projects
            </button>
            <button onClick={() => setActiveTab('footer')} className={`px-4 py-2 rounded-md text-xs tracking-widest uppercase flex items-center transition-all ${activeTab === 'footer' ? 'bg-brand-accent text-white' : 'text-gray-500 hover:text-white'}`}>
              <LinkIcon className="w-3 h-3 mr-2" /> Footer
            </button>
            <button onClick={() => setActiveTab('cloudinary')} className={`px-4 py-2 rounded-md text-xs tracking-widest uppercase flex items-center transition-all ${activeTab === 'cloudinary' ? 'bg-brand-accent text-white' : 'text-gray-500 hover:text-white'}`}>
              <Settings className="w-3 h-3 mr-2" /> Media
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {activeTab === 'general' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-[#0f0f0f] border border-white/5 p-8 rounded-2xl">
                <h2 className="text-xl font-serif italic mb-6 text-white/80">Hero Headline</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Line One (Light/Italic)</label>
                    <input value={heroLine1} onChange={e => setHeroLine1(e.target.value)} className="w-full bg-black border border-white/10 p-3 rounded text-white focus:border-brand-accent outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Line Two (Bold/Caps)</label>
                    <input value={heroLine2} onChange={e => setHeroLine2(e.target.value)} className="w-full bg-black border border-white/10 p-3 rounded text-white focus:border-brand-accent outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Accent Word (Orange)</label>
                    <input value={heroAccent} onChange={e => setHeroAccent(e.target.value)} className="w-full bg-black border border-white/10 p-3 rounded text-brand-accent focus:border-brand-accent outline-none" />
                  </div>
                </div>
              </div>
              <div className="bg-[#0f0f0f] border border-white/5 p-8 rounded-2xl">
                <h2 className="text-xl font-serif italic mb-6 text-white/80">Brand Bio</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Main Description</label>
                    <textarea value={aboutText} onChange={e => setAboutText(e.target.value)} rows={6} className="w-full bg-black border border-white/10 p-3 rounded text-white focus:border-brand-accent outline-none resize-none" />
                  </div>
                  <button onClick={handleSaveGeneral} className="w-full bg-brand-accent text-white py-4 rounded-xl font-medium flex items-center justify-center hover:scale-[1.02] transition-transform active:scale-[0.98]">
                    <Save className="w-4 h-4 mr-2" /> Update Content
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cloudinary' && (
            <div className="max-w-2xl mx-auto bg-[#0f0f0f] border border-white/5 p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-brand-accent" />
                </div>
                <h2 className="text-xl font-serif italic text-white/80">Cloudinary Integration</h2>
              </div>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                Connect your Cloudinary account to enable high-quality image uploads and optimization. You can find these in your Cloudinary Dashboard.
              </p>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Cloud Name</label>
                  <input value={cloudName} onChange={e => setCloudName(e.target.value)} placeholder="e.g. dxxxxyyyy" className="w-full bg-black border border-white/10 p-3 rounded text-white focus:border-brand-accent outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Upload Preset</label>
                  <input value={uploadPreset} onChange={e => setUploadPreset(e.target.value)} placeholder="e.g. ml_default" className="w-full bg-black border border-white/10 p-3 rounded text-white focus:border-brand-accent outline-none" />
                </div>
                <button onClick={handleSaveCloudinary} className="w-full bg-white text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-brand-accent hover:text-white transition-colors">
                  <Save className="w-4 h-4 inline mr-2" /> Connect Cloudinary
                </button>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-serif italic">Management</h2>
                <button 
                  onClick={() => { setIsAdding(true); setEditingProjectId(null); setProjectForm({ gallery: [] }); }}
                  className="bg-brand-accent text-white px-6 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform"
                >
                  <Plus className="w-4 h-4 inline mr-1" /> New Project
                </button>
              </div>

              {(isAdding || editingProjectId) && (
                <div className="bg-[#0f0f0f] border border-brand-accent/20 p-8 rounded-2xl animate-in zoom-in-95 duration-300">
                  <h3 className="text-lg font-serif italic mb-6">{editingProjectId ? 'Edit Project' : 'Add New Project'}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <input placeholder="Unique ID (e.g. fashion-brand-vfx)" value={projectForm.id || ''} onChange={e => setProjectForm({...projectForm, id: e.target.value})} className="w-full bg-black border border-white/10 p-3 rounded text-white outline-none focus:border-brand-accent" />
                      <input placeholder="Project Title" value={projectForm.title || ''} onChange={e => setProjectForm({...projectForm, title: e.target.value})} className="w-full bg-black border border-white/10 p-3 rounded text-white outline-none focus:border-brand-accent" />
                      <input placeholder="Category" value={projectForm.category || ''} onChange={e => setProjectForm({...projectForm, category: e.target.value})} className="w-full bg-black border border-white/10 p-3 rounded text-white outline-none focus:border-brand-accent" />
                      <input placeholder="Date (e.g. Feb 2024)" value={projectForm.date || ''} onChange={e => setProjectForm({...projectForm, date: e.target.value})} className="w-full bg-black border border-white/10 p-3 rounded text-white outline-none focus:border-brand-accent" />
                    </div>
                    <div className="space-y-4">
                      <div className="relative group">
                        <input placeholder="Cover Image URL" value={projectForm.coverImage || ''} onChange={e => setProjectForm({...projectForm, coverImage: e.target.value})} className="w-full bg-black border border-white/10 p-3 rounded text-white outline-none focus:border-brand-accent pr-12" />
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute right-2 top-2 p-1.5 bg-[#111] rounded hover:bg-brand-accent transition-colors"
                        >
                          <Upload className="w-4 h-4" />
                        </button>
                      </div>
                      <textarea placeholder="Detailed Description" value={projectForm.description || ''} onChange={e => setProjectForm({...projectForm, description: e.target.value})} rows={5} className="w-full bg-black border border-white/10 p-3 rounded text-white outline-none focus:border-brand-accent resize-none" />
                    </div>
                  </div>

                  {/* Gallery Management */}
                  <div className="mt-8 border-t border-white/5 pt-8">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Project Gallery</h4>
                      <label className="cursor-pointer text-brand-accent hover:text-white flex items-center text-xs">
                        <Plus className="w-3 h-3 mr-1" /> Add Image
                        <input type="file" className="hidden" onChange={e => e.target.files?.[0] && handleGalleryUpload(e.target.files[0])} />
                      </label>
                    </div>
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
                      {projectForm.gallery?.map((img, i) => (
                        <div key={i} className="relative aspect-square rounded overflow-hidden border border-white/10 group">
                          <img src={img} className="w-full h-full object-cover grayscale" alt="" />
                          <button 
                            onClick={() => setProjectForm(prev => ({...prev, gallery: prev.gallery?.filter((_, idx) => idx !== i)}))}
                            className="absolute inset-0 bg-red-500/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-8 flex gap-4">
                    <button onClick={editingProjectId ? handleUpdateProject : handleAddProject} className="flex-1 bg-brand-accent text-white py-3 rounded-xl font-bold">
                      {editingProjectId ? 'Save Changes' : 'Create Project'}
                    </button>
                    <button onClick={() => { setIsAdding(false); setEditingProjectId(null); }} className="px-8 border border-white/10 rounded-xl hover:bg-white/5 transition-colors">Cancel</button>
                  </div>
                  
                  <input type="file" ref={fileInputRef} className="hidden" onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = await handleCloudinaryUpload(file);
                      if (url) setProjectForm({...projectForm, coverImage: url});
                    }
                  }} />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.projects.map(proj => (
                  <div key={proj.id} className="group bg-[#0f0f0f] border border-white/5 rounded-2xl overflow-hidden hover:border-brand-accent/50 transition-all">
                    <div className="h-40 relative overflow-hidden">
                      <img src={proj.coverImage} className="w-full h-full object-cover md:grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-serif italic text-lg">{proj.title}</h4>
                          <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">{proj.category}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => openEditProject(proj)} title="Edit Project" className="p-2 bg-white/5 rounded-full hover:bg-brand-accent transition-colors text-gray-400 hover:text-white">
                            <ImageIcon className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteProject(proj.id)} title="Delete Project" className="p-2 bg-white/5 rounded-full hover:bg-red-500 transition-colors text-gray-400 hover:text-white">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'footer' && (
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="bg-[#0f0f0f] border border-white/5 p-8 rounded-2xl">
                <h2 className="text-xl font-serif italic mb-6">Footer Text</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Footer Tagline</label>
                    <input value={footerTagline} onChange={e => setFooterTagline(e.target.value)} className="w-full bg-black border border-white/10 p-3 rounded text-white focus:border-brand-accent outline-none" />
                  </div>
                  <button onClick={handleSaveFooter} className="bg-brand-accent px-6 py-2 rounded text-sm font-medium">Save Footer Text</button>
                </div>
              </div>

              <div className="bg-[#0f0f0f] border border-white/5 p-8 rounded-2xl">
                <div className="flex items-center gap-2 mb-4 text-orange-400">
                  <Info className="w-4 h-4" />
                  <p className="text-xs font-sans uppercase tracking-widest">Footer Link Editor coming soon</p>
                </div>
                <p className="text-gray-500 text-sm">
                  The footer links have been optimized. Non-functional links were removed. Currently, links are configured to point to major site sections.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
      
      {isUploading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-brand-accent border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-brand-accent font-serif italic text-xl animate-pulse">Uploading to Cloudinary...</p>
        </div>
      )}
    </div>
  );
}
