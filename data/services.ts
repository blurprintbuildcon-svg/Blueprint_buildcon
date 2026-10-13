import { Home, Building2, PencilRuler, Hammer, PaintRoller, ClipboardList, LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  icon: LucideIcon;
  image: string;
  features: string[];
  deliverables: string[];
  processHighlights: string[];
}

export const services: ServiceItem[] = [
  {
    id: 'residential-construction',
    title: 'Residential Construction',
    shortDescription: 'Complete home construction from planning and design to structure, finishing and handover.',
    description: 'We specialize in building bespoke independent residences, luxury duplex villas, and premium gated bungalows crafted to the highest civil and architectural standards. Our end-to-end turnkey residential solutions cover architectural sanctions, soil testing, robust RCC framing, premium masonry, and turnkey handover on strict milestone timelines.',
    category: 'Residential',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80',
    features: [
      'Turnkey civil construction with certified structural warranty',
      'Customized architectural plans matching family lifestyle & Vastu',
      'Daily/weekly app progress reports & live site CCTV tracking',
      'Anti-termite treated foundations & multi-layer waterproofing',
    ],
    deliverables: [
      'Sanctioned architectural and structural drawing sets',
      'Bill of Quantities (BOQ) with zero hidden cost guarantees',
      'Material test verification certificates (Cement, Steel, Concrete)',
      'Occupancy-ready turnkey residence handover certificate',
    ],
    processHighlights: [
      'Site Survey & Feasibility Modeling',
      'Foundation & RCC Framing Superstructure',
      'Brickwork, Plastering & Conduit MEP Installation',
      'Tile Laying, Premium Paint & Fixture Handover',
    ],
  },
  {
    id: 'commercial-construction',
    title: 'Commercial Construction',
    shortDescription: 'Reliable construction solutions for offices, retail spaces, commercial buildings and business properties.',
    description: 'Designed for forward-thinking businesses and commercial property developers. We deliver corporate office parks, mixed-use retail spaces, institutional buildings, and commercial complexes engineered for maximum operational efficiency, safety compliance, high floor-to-ceiling heights, and sustainable energy efficiency.',
    category: 'Commercial',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80',
    features: [
      'High-span structural design for open office floor layouts',
      'Full fire & life safety statutory clearance compliance',
      'Centralized HVAC & energy management integration',
      'Strict adherence to commercial handover deadlines & penalties',
    ],
    deliverables: [
      'Industrial-grade structural engineering blueprints',
      'Comprehensive fire, safety, and civic clearance dossiers',
      'HVAC, elevator & electrical sub-station commissioning reports',
      'As-built facility management documentation',
    ],
    processHighlights: [
      'Zoning, Environmental & Commercial Sanction Clearance',
      'Heavy Concrete Piling & Post-Tensioned Slab Construction',
      'Curtain Wall Glazing & Facade Engineering',
      'High-Load MEP Commissioning & Occupational Certification',
    ],
  },
  {
    id: 'architectural-design',
    title: 'Architectural Design',
    shortDescription: 'Functional and aesthetic architectural planning tailored to your site, lifestyle and requirements.',
    description: 'Our design studio creates inspiring living and commercial spaces that blend artistic elegance with technical rationality. From climate-responsive orientation and passive solar lighting to high-end 3D photo renders and parametric facades, we give physical form to your creative imagination.',
    category: 'Design & Planning',
    icon: PencilRuler,
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80',
    features: [
      'Photorealistic 3D external and internal walkthrough renders',
      'Vastu-compliant, space-optimized 2D floor plans',
      'Climate-responsive daylight and airflow modeling',
      'Full submission documentation for municipal sanctions',
    ],
    deliverables: [
      'Comprehensive 2D blueprint packages (Civil, Electrical, Plumbing)',
      'High-resolution 4K 3D exterior & interior visual renders',
      'Material specification schedules and palette boards',
      'Municipal sanction approval drawing sets',
    ],
    processHighlights: [
      'Client Lifestyle & Briefing Sessions',
      'Concept Layout & Spatial Massing Studies',
      '3D Visualization & Exterior Facade Styling',
      'Detailed Working Drawings & Structural Coordination',
    ],
  },
  {
    id: 'renovation',
    title: 'Renovation & Remodeling',
    shortDescription: 'Transform existing spaces with modern layouts, structural improvements and premium finishes.',
    description: 'Breathe new life into aging homes, outdated office floors, and heritage structures. We offer structural reinforcement, space reconfiguration, floor elevation, facade modernizations, and retrofitting services with minimal disruption and unmatched craftsmanship.',
    category: 'Renovation',
    icon: Hammer,
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80',
    features: [
      'Structural integrity audits and load-bearing wall retrofitting',
      'Complete facade makeover and modern exterior claddings',
      'Re-routing of antiquated electrical and plumbing conduits',
      'Dust-controlled, safe and clean construction operations',
    ],
    deliverables: [
      'Pre-renovation structural health audit report',
      'Demolition, salvage and replacement schedules',
      'Re-engineered space layouts with modernized finishes',
      'Post-renovation warranty certificate',
    ],
    processHighlights: [
      'Structural Condition & Snag Assessment',
      'Controlled Demolition & Structural Reinforcement',
      'MEP Overhaul & Layout Reconfiguration',
      'Surface Finishing, Painting & New Fixtures',
    ],
  },
  {
    id: 'interior',
    title: 'Interior & Finishing',
    shortDescription: 'Professional interior execution, flooring, painting, electrical, plumbing, kitchens and finishing work.',
    description: 'Flawless interiors that elevate daily life. We manage end-to-end bespoke modular kitchens, custom cabinetry, acoustic ceiling treatments, Italian marble and hardwood installations, designer lighting fixtures, and premium wall finishes.',
    category: 'Interiors',
    icon: PaintRoller,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80',
    features: [
      'Factory-finished precision modular kitchen & wardrobe joinery',
      'Designer false ceilings with ambient cove & magnetic track lights',
      'Seamless Italian marble diamond polishing and vitrified tiling',
      'Eco-friendly luxury washable wall coatings and textures',
    ],
    deliverables: [
      'Comprehensive 3D interior design renders & layout guides',
      'Custom carpentry and millwork shop drawings',
      'Hardware and sanitary ware warranty certifications',
      'Turnkey cleaned, move-in ready interior spaces',
    ],
    processHighlights: [
      'Moodboard & Theme Selection',
      'Concealed Piping & False Ceiling Grid Framing',
      'Modular Joinery Delivery & High-Precision Assembly',
      'Surface Polishing, Lighting Installation & Styling',
    ],
  },
  {
    id: 'project-management',
    title: 'Project Management & Supervision',
    shortDescription: 'Dedicated supervision, scheduling, vendor coordination, quality inspections and progress monitoring.',
    description: 'Ensure your project stays on schedule, on budget, and true to engineering specifications. Our dedicated Project Management Consultancy (PMC) team handles material procurement audits, vendor management, quality assurance, milestone billing verification, and site safety.',
    category: 'Consultancy',
    icon: ClipboardList,
    image: 'https://plus.unsplash.com/premium_photo-1661290256778-3b821d52c514?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    features: [
      'Daily site inspections and independent QA/QC verification',
      'Critical Path Method (CPM) project scheduling and timeline controls',
      'Vendor bill measurement verification to eliminate billing inflation',
      'Site safety, worker welfare, and insurance risk mitigation',
    ],
    deliverables: [
      'Weekly Gantt chart progress reports and variance alerts',
      'Independent material testing verification logs',
      'Detailed contractor bill audits and cost reconciliation',
      'Comprehensive project completion dossier',
    ],
    processHighlights: [
      'Project Baseline Scheduling & Resource Loading',
      'Procurement & Quality Audit Framework Setup',
      'Daily Field Supervision & Quality Gate Sign-Offs',
      'Final Snagging, Reconciliation & Handover Audit',
    ],
  },
];
