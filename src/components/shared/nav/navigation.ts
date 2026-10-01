// src/components/shared/nav/navigation.ts
//
// Single source of truth for the header. Text, routes and descriptions are
// code-driven by design. Only `image` on a service is intended to move to
// Sanity later.

export interface ServiceLink {
  label: string;
  href: string;
  description: string;
  image: string;
}

/** A column in the Services mega menu. */
export interface ServiceGroup {
  title: string;
  services: ServiceLink[];
}

/** A card in the Who we help / Work / Company menus. */
export interface MenuCard {
  label: string;
  href: string;
  description: string;
}

export type NavItem =
  | { label: string; href: string; menu?: never; cards?: never }
  | { label: string; menu: "services"; href?: never; cards?: never }
  | { label: string; menu: "cards"; cards: MenuCard[]; href?: never };

export const navItems: NavItem[] = [
  { label: "Services", menu: "services" },
  {
    label: "Who we help",
    menu: "cards",
    cards: [
      { label: "Developers & construction", href: "/who-we-help/developers", description: "Visuals that sell units" },
      { label: "Architects & landscape", href: "/who-we-help/architects", description: "Images that win projects" },
      { label: "Interior designers", href: "/who-we-help/interior-designers", description: "Faster client approvals" },
      { label: "Homeowners", href: "/who-we-help/homeowners", description: "Decide with confidence" },
      { label: "Students", href: "/who-we-help/students", description: "Thesis and portfolio packages" },
    ],
  },
  {
    label: "Work",
    menu: "cards",
    cards: [
      { label: "Case studies", href: "/case-studies", description: "Challenge, what we delivered, results" },
      { label: "Gallery", href: "/gallery", description: "Browse renders by project type" },
    ],
  },
  {
    label: "Company",
    menu: "cards",
    cards: [
      { label: "About us", href: "/studio", description: "Our story, team and way of working" },
      { label: "Careers", href: "/career", description: "Join the studio" },
    ],
  },
  { label: "Contact", href: "/studio/#scheduleCall" },
];
/** Grouped into the four columns of the Services mega menu. */
export const serviceGroups: ServiceGroup[] = [
  {
    title: "Architecture & Design",
    services: [
      { label: "Interior Design", href: "/services/interior-design", description: "Layouts, materials and furnishings designed together, so the space works as well as it looks.", image: "/services/interior-design.svg" },
      { label: "Space Planning", href: "/services/space-planning", description: "Layouts tested for flow, function and furniture before anything is built.", image: "/services/space-planning.svg" },
      { label: "Concept Design", href: "/services/concept-design", description: "Early design directions developed fast, so the right idea is chosen before detail begins.", image: "/services/concept-design.svg" },
      { label: "Master Planning", href: "/services/master-planning", description: "Site-wide plans for phasing, circulation and landscape across a whole development.", image: "/services/master-planning.svg" },
      { label: "Architectural Design", href: "/services/architectural-design", description: "Building design from first sketch to a scheme ready for approval and construction.", image: "/services/architectural-design.svg" },
      { label: "Renovation & Remodeling", href: "/services/renovation-remodeling", description: "Rework an existing space and see the result before any wall comes down.", image: "/services/renovation-remodeling.svg" },
    ],
  },
  {
    title: "Visualization & CGI",
    services: [
      { label: "Exterior Visualization", href: "/services/exterior-3d-renderings", description: "Facades, landscaping and light studied together, so a building is judged the way it will actually be seen from the street.", image: "/services/exterior-3d-renderings.svg" },
      { label: "Interior Visualization", href: "/services/interior-3d-visualization", description: "Rooms built to the drawing and lit to the hour, with materials detailed enough to sell the space before it exists.", image: "/services/interior-3d-visualization.svg" },
      { label: "Real Estate Visualization", href: "/services/real-estate-rendering", description: "Marketing imagery built for listings and brochures, ready well before the first brick is laid.", image: "/services/real-estate-rendering.svg" },
      { label: "3D & Marketing Floor Plans", href: "/services/marketing-floor-plans", description: "Furnished, textured floor plans that show buyers how a home lives, not just how it measures.", image: "/services/marketing-floor-plans.svg" },
      { label: "Aerial & Masterplan Visualization", href: "/services/aerial-view-rendering", description: "The whole development and its surroundings in one convincing view.", image: "/services/aerial-view-rendering.svg" },
      { label: "Product & Furniture Visualization", href: "/services/3d-product-visualization", description: "Studio-quality imagery of products and furniture, in room sets or on clean backgrounds, without a studio.", image: "/services/3d-product-visualization.svg" },
    ],
  },
  {
    title: "3D Modeling & BIM",
    services: [
       { label: "BIM Modeling", href: "/services/bim-modeling", description: "Coordinated building information models your whole project team can work from.", image: "/services/bim-modeling.svg" },
      { label: "CAD Drafting", href: "/services/cad-drafting", description: "Precise 2D drawings produced to your standards and ready to issue.", image: "/services/cad-drafting.svg" },
        { label: "Permit Drawing Sets", href: "/services/permit-drawings", description: "Drawings prepared for submission, so approvals move without avoidable delays.", image: "/services/permit-drawings.svg" },
      { label: "Floor Plans & Elevations", href: "/services/floor-plan", description: "Measured plans and elevations drawn accurately enough to design and build from.", image: "/services/floor-plan.svg" },
      { label: "Architectural 3D Modeling", href: "/services/architectural-3d-modeling", description: "Accurate models built from your drawings, clean enough to render from and reliable enough to measure against.", image: "/services/architectural-3d-modeling.svg" },
        { label: "Construction Documentation", href: "/services/construction-documentation", description: "Complete drawing sets detailed enough for contractors to price and build from.", image: "/services/construction-documentation.svg" },
      { label: "Product & Furniture 3D Modeling", href: "/services/product-furniture-modeling", description: "Production-ready models with correct proportions and materials, reusable across every scene and configurator.", image: "/services/product-furniture-modeling.svg" },
    ],
  },
  {
    title: "Immersive & Digital",
    services: [
      { label: "VR Experiences", href: "/services/vr-experiences", description: "Stand inside the finished space on a headset, at true scale, before it exists.", image: "/services/vr-experiences.svg" },
      { label: "360° Virtual Tours", href: "/services/virtual-tours", description: "Look in every direction from any point, on any screen, with no app to install.", image: "/services/virtual-tours.svg" },
      { label: "3D Web Configurators", href: "/services/web-configurators", description: "Let customers change finishes and options live, and see the result instantly.", image: "/services/web-configurators.svg" },
       { label: "Architectural Animation & Walkthroughs", href: "/services/architectural-animation", description: "Cinematic sequences and continuous walkthroughs that show a space the way a visitor would move through it.", image: "/services/architectural-animation.svg" },
    ],
  },
];

/**
 * How the groups are laid out in the mega menu — one per column.
 * Reordering here changes the menu without touching the component.
 */
function group(title: string): ServiceGroup {
  const found = serviceGroups.find((g) => g.title === title);
  if (!found) throw new Error(`Unknown service group: ${title}`);
  return found;
}

export const serviceColumns: ServiceGroup[][] = [
  [group("Architecture & Design")],
  [group("Visualization & CGI")],
  [group("3D Modeling & BIM")],
  [group("Immersive & Digital")],
];

/** Flat list — /services/[slug] uses this for generateStaticParams. */
export const services: ServiceLink[] = serviceGroups.flatMap((g) => g.services);

/** Shown in the mega menu's preview panel until another is hovered. */
export const featuredService =
  services.find((s) => s.href === "/services/aerial-view-rendering") ?? services[0];