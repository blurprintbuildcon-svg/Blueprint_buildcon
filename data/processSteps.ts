export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  duration: string;
  deliverables: string[];
  keyActivities: string[];
  clientInvolvement: string;
  qualityMilestone: string;
}

export const processSteps: ProcessStep[] = [
  {
    id: 'consultation',
    number: '01',
    title: 'Consultation',
    shortDescription:
      'We understand your requirements, budget, timeline, and vision for your construction project.',
    fullDescription:
      'The foundation of every iconic project begins with deep listening. In our initial consultation phase, our senior architectural and engineering consultants meet with you to thoroughly analyze your requirements, aesthetic aspirations, site conditions, zoning regulations, and budgetary frameworks.',
    image:
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
    duration: '1 – 2 Weeks',
    deliverables: [
      'Comprehensive Project Brief & Feasibility Summary',
      'Initial Site & Zoning Assessment Report',
      'Preliminary Budget Estimates & Milestone Roadmaps',
      'Dedicated Client Relationship & Engineering Team Assignment',
    ],
    keyActivities: [
      'In-depth stakeholder and family lifestyle requirement gathering',
      'Site topography and geo-environmental evaluation',
      'Local municipal guideline and zoning verification',
      'Cost modeling and financial milestone alignment',
    ],
    clientInvolvement:
      'Sharing design inspiration, property documentation, and functional preferences.',
    qualityMilestone:
      'Formal Sign-off on Project Scope & Feasibility Confirmation.',
  },
  {
    id: 'planning-design',
    number: '02',
    title: 'Planning & Design',
    shortDescription:
      'Our team develops detailed plans and designs that match your requirements and project goals.',
    fullDescription:
      'Our architectural design bureau transforms abstract ideas into breathtaking 2D layouts and photorealistic 3D visualizations. We balance space efficiency, natural ventilation, lighting orientation, structural integrity, and sustainable green building standards.',
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    duration: '2 – 4 Weeks',
    deliverables: [
      'Conceptual 2D Floor Layouts & Elevation Views',
      'Photorealistic 3D Exterior & Interior Renderings',
      'Material Palette & Finishes Selection Catalog',
      'Municipal Submission Drawing Sets',
    ],
    keyActivities: [
      'Iterative design review sessions with architectural leads',
      'Sunlight path and wind simulation analyses',
      'MEP (Mechanical, Electrical, Plumbing) conceptual routing',
      'Interior space optimization and furniture layout zoning',
    ],
    clientInvolvement:
      'Reviewing 3D perspectives and approving color palettes and aesthetic fixtures.',
    qualityMilestone:
      'Approved Master Concept Design & Final Architectural Package.',
  },
  {
    id: 'blueprint',
    number: '03',
    title: 'Blueprint & Engineering',
    shortDescription:
      'Detailed architectural blueprints and technical drawings are prepared before construction begins.',
    fullDescription:
      'Precision engineering guarantees safety, durability, and compliance. Our licensed structural engineers create rigorous civil blueprints, earthquake-resistant structural calculations, detailed electrical circuits, and plumbing networks before any ground is broken.',
    image:
      'https://images.unsplash.com/photo-1542621334-a254cf47733d?auto=format&fit=crop&w=1200&q=80',
    duration: '2 – 3 Weeks',
    deliverables: [
      'Full Structural CAD & BIM Engineering Blueprints',
      'Detailed Bill of Quantities (BOQ) with Transparent Itemized Costing',
      'Statutory Municipal & Environmental Clearance Approvals',
      'Construction Health & Safety (EHS) Plan',
    ],
    keyActivities: [
      'Seismic and load-bearing stress calculations',
      'Full MEP engineering integration and clash detection',
      'Contractor and material procurement scheduling',
      'Statutory civic body sanction filing and compliance checks',
    ],
    clientInvolvement:
      'Signing statutory approval documentation and final BOQ contract review.',
    qualityMilestone:
      'Peer-reviewed Structural Engineering Certification & Municipal Sanction.',
  },
  {
    id: 'construction',
    number: '04',
    title: 'Construction & Execution',
    shortDescription:
      'Our experienced team manages the construction process while maintaining quality and timelines.',
    fullDescription:
      'With plans finalized and sanctions approved, our on-site civil engineers, project managers, and skilled craftsmen mobilize on site. We execute excavation, structural RCC framing, masonry, electrical conduits, and finishing with real-time app tracking and transparent milestone updates.',
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    duration: '6 – 14 Months (Project Dependent)',
    deliverables: [
      'Milestone-by-Milestone Progress Reports & Drone Photography',
      'Live CCTV Site Access for Remote Client Monitoring',
      'Material Batch Quality & Compressive Strength Certificates',
      'On-site Health, Safety & Environmental Compliance Logs',
    ],
    keyActivities: [
      'Excavation, foundation, and RCC casting under senior supervision',
      'Masonry brickwork, plastering, waterproofing, and thermal barrier insulation',
      'Concealed conduit installation and plumbing pressure testing',
      'Flooring, painting, modular woodwork, and custom glazing installations',
    ],
    clientInvolvement:
      'Participating in milestone walk-throughs and tracking digital progress reports.',
    qualityMilestone:
      'Cube Strength Test Verification & Multi-Tier Civil Engineering Audits.',
  },
  {
    id: 'quality-inspection',
    number: '05',
    title: 'Quality Inspection',
    shortDescription:
      'Every stage is carefully inspected to ensure that the work meets required quality standards.',
    fullDescription:
      'Quality is non-negotiable at BluePrint BuildCon. Our dedicated Quality Assurance & Quality Control (QA/QC) cell conducts over 400+ distinct checks spanning structural density, waterproofing integrity, alignment accuracy, electrical load balances, and acoustic performance.',
    image:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
    duration: '2 – 3 Weeks',
    deliverables: [
      'Comprehensive 400+ Point QA/QC Inspection Scorecard',
      'Hydrostatic & Thermal Waterproofing Leakage Test Clearance',
      'Electrical Load and Earthing Resistance Audit Report',
      'Snag List Resolution & Remediation Clearance Sheet',
    ],
    keyActivities: [
      'Ponding test for terrace and wet area waterproofing longevity',
      'Laser leveling and plumb line surface tolerance checks',
      'Electrical insulation megger test and circuit breaker trip audits',
      'Finishing surface inspection, polish uniformity, and hardware testing',
    ],
    clientInvolvement:
      'Joint walkthrough alongside chief inspector for snag verification.',
    qualityMilestone:
      'Zero-Defect Snag Sign-off & QA/QC Quality Certificate.',
  },
  {
    id: 'handover',
    number: '06',
    title: 'Handover & Warranty',
    shortDescription:
      'Once everything is completed and inspected, your finished project is handed over to you.',
    fullDescription:
      'The most rewarding milestone of the journey. We present you with the ceremonial keys to your completed dream property, along with comprehensive as-built drawings, maintenance manuals, product warranties, and ongoing post-handover warranty coverage.',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    duration: '1 Week',
    deliverables: [
      'Official Handover Certificate & Ceremonial Key Presentation',
      'As-Built Architectural, Structural & MEP Drawings',
      'Appliance, Fixture & Waterproofing Warranties Package',
      'Dedicated Post-Handover Maintenance Assistance Care Contact',
    ],
    keyActivities: [
      'Comprehensive deep cleaning and turnkey sanitization of all spaces',
      'Orientation on electrical switchgear, solar systems, and automation panels',
      'Transfer of statutory occupancy certifications and utility connections',
      'Activation of long-term structural warranty guarantees',
    ],
    clientInvolvement:
      'Key handover celebration, final documentation receipt, and feedback review.',
    qualityMilestone:
      'Signed Handover Acceptance & Warranty Activation Certificate.',
  },
];
