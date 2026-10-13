import mongoose from 'mongoose';
import { connectToDatabase } from '@/lib/mongodb';
import { Project } from '@/models/Project';
import { Service } from '@/models/Service';
import { projects as fallbackProjects } from '@/data/projects';
import { services as fallbackServices } from '@/data/services';

export type PublicProject = {
  id: string;
  title: string;
  location: string;
  category: string;
  type?: string;
  client?: string;
  year?: number;
  description: string;
  image: string;
  images: string[];
  scope: string[];
  additionalDetails?: string;
  details: { duration: string; area: string; completion: string };
};

export type PublicService = {
  id: string;
  title: string;
  description: string;
  iconName?: string;
  image: string;
};

export async function getPublicProjects(): Promise<PublicProject[]> {
  try {
    await connectToDatabase();
    const records = await Project.find({ status: 'published' }).sort({ createdAt: -1 }).lean();
    if (records.length) {
      return records.map((project) => {
        const imageUrls = Array.isArray(project.images) && project.images.length > 0
          ? project.images.map((img: { url: string }) => img.url).filter(Boolean)
          : [];
        const mainImage = imageUrls[0] || fallbackProjects[0].image;
        return {
          id: String(project._id),
          title: project.title,
          location: project.location,
          category: project.category,
          type: project.type || `${project.category} Project`,
          client: project.client || '',
          year: project.year,
          description: project.description,
          image: mainImage,
          images: imageUrls.length > 0 ? imageUrls : [mainImage],
          scope: Array.isArray(project.scope) && project.scope.length > 0
            ? project.scope
            : ['Architecture & Approvals', 'Structural Civil Design', 'Turnkey Construction', 'Interior Finishing & MEP'],
          additionalDetails: project.additionalDetails || '',
          details: {
            duration: project.duration || 'Flexible Timeline',
            area: project.area || 'Custom Specification',
            completion: project.completion || 'Completed',
          },
        };
      });
    }
  } catch {
    /* Static content keeps the public site available while MongoDB is unavailable. */
  }
  return fallbackProjects.map((p) => ({
    ...p,
    images: p.images && p.images.length > 0 ? p.images : [p.image],
  }));
}

export async function getPublicProjectById(id: string): Promise<PublicProject | null> {
  try {
    await connectToDatabase();
    let record: any = null;
    if (mongoose.isValidObjectId(id)) {
      record = await Project.findById(id).lean();
    }
    if (!record) {
      try {
        record = await Project.findOne({ _id: id }).lean();
      } catch {
        /* invalid query format */
      }
    }
    if (record) {
      const imageUrls = Array.isArray(record.images) && record.images.length > 0
        ? record.images.map((img: { url: string }) => img.url).filter(Boolean)
        : [];
      const mainImage = imageUrls[0] || fallbackProjects[0].image;
      return {
        id: String(record._id),
        title: record.title,
        location: record.location,
        category: record.category,
        type: record.type || `${record.category} Project`,
        client: record.client || '',
        year: record.year,
        description: record.description,
        image: mainImage,
        images: imageUrls.length > 0 ? imageUrls : [mainImage],
        scope: Array.isArray(record.scope) && record.scope.length > 0
          ? record.scope
          : ['Architecture & Approvals', 'Structural Civil Design', 'Turnkey Construction', 'Interior Finishing & MEP'],
        additionalDetails: record.additionalDetails || '',
        details: {
          duration: record.duration || 'Flexible Timeline',
          area: record.area || 'Custom Specification',
          completion: record.completion || 'Completed',
        },
      };
    }
  } catch {
    /* Database connection or query failed, continue to fallback */
  }

  const fallback = fallbackProjects.find((item) => item.id === id);
  if (fallback) {
    return {
      ...fallback,
      images: fallback.images && fallback.images.length > 0 ? fallback.images : [fallback.image],
    };
  }

  return null;
}

export async function getRelatedProjects(currentId: string, category?: string, limit: number = 3): Promise<PublicProject[]> {
  const allProjects = await getPublicProjects();
  const others = allProjects.filter((p) => p.id !== currentId);
  const sameCategory = category ? others.filter((p) => p.category.toLowerCase() === category.toLowerCase()) : [];
  const remaining = others.filter((p) => !sameCategory.includes(p));
  return [...sameCategory, ...remaining].slice(0, limit);
}

export async function getPublicServices(): Promise<PublicService[]> {
  try {
    await connectToDatabase();
    const records = await Service.find().sort({ createdAt: -1 }).lean();
    if (records.length) return records.map((service) => ({ id: String(service._id), title: service.title, description: service.shortDescription || service.description, iconName: fallbackServices.find((item) => item.title === service.title)?.id ?? fallbackServices[0].id, image: service.image?.url ?? fallbackServices[0].image }));
  } catch { /* Static content keeps the public site available while MongoDB is unavailable. */ }

  return fallbackServices.map(({ icon, ...item }) => ({
    ...item,
    iconName: item.id,
    image: item.image,
  }));
}