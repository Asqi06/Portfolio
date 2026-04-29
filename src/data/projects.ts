export interface ProjectData {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  coverImage: string;
  gallery: string[];
}

export const projects: ProjectData[] = [
  {
    id: "satvastones-minimal-luxury",
    title: "Satvastones: Minimal Luxury",
    date: "February 2024",
    category: "Brand Identity & 3D",
    description: "Satvastones is a minimal luxury jewelry brand concept born from the intersection of Korean and Western aesthetics. This project involved full world-building—from 3D environment design to cinematic storytelling. I focused on designing a complete 'vibe' that audiences resonate with instantly, demonstrating how premium identity can elevate a product's value in the modern e-commerce landscape.",
    coverImage: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1599643478514-4a410f060f42?w=800&q=80",
      "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&q=80",
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=800&q=80"
    ]
  },
  {
    id: "cinematic-3d-environments",
    title: "Cinematic 3D Environments",
    date: "November 2023",
    category: "3D Art",
    description: "An exploration of scale, lighting, and mood using Blender. This project focuses on experimental 3D storytelling where every frame feels like a still from an unreleased sci-fi film. By blending architectural elements with surreal landscapes, the environments evoke a sense of deep mystery and narrative tension.",
    coverImage: "https://images.unsplash.com/photo-1543130732-4b8da601004b?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80"
    ]
  },
  {
    id: "ecommerce-identity",
    title: "E-commerce Identity",
    date: "August 2023",
    category: "Brand Vision",
    description: "Crafting a high-end visual language for a modern e-commerce platform. The goal was to elevate standard product photography into stylized 3D visuals that demand attention. The project bridges the gap between raw data analytics and human-centric design, creating a seamless user experience built on visual trust.",
    coverImage: "https://images.unsplash.com/photo-1595341585645-885f62dfd827?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
    ]
  }
];
