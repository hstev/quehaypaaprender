export interface CategoryMeta {
  name: string;
  slug: string;
  description: string;
  accent: 'yellow' | 'blue' | 'red' | 'neutral';
}

export const CATEGORIES: CategoryMeta[] = [
  {
    name: 'Tecnología',
    slug: 'tecnologia',
    description: 'Infraestructura, cloud, herramientas y sistemas modernos.',
    accent: 'blue',
  },
  {
    name: 'Programación',
    slug: 'programacion',
    description: 'Conceptos, lenguajes y prácticas para construir software.',
    accent: 'blue',
  },
  {
    name: 'Ciencia',
    slug: 'ciencia',
    description: 'Ideas científicas claras, sin jerga innecesaria.',
    accent: 'yellow',
  },
  {
    name: 'Matemáticas',
    slug: 'matematicas',
    description: 'Números, patrones y razonamiento aplicado a la vida real.',
    accent: 'blue',
  },
  {
    name: 'Cocina',
    slug: 'cocina',
    description: 'Recetas y técnicas con sabor, paso a paso.',
    accent: 'red',
  },
  {
    name: 'Productividad',
    slug: 'productividad',
    description: 'Métodos para enfocarte, organizar y avanzar.',
    accent: 'yellow',
  },
  {
    name: 'Diseño',
    slug: 'diseno',
    description: 'Principios visuales, tipografía y experiencia de uso.',
    accent: 'red',
  },
  {
    name: 'Historia',
    slug: 'historia',
    description: 'Contextos, relatos y lecciones del pasado.',
    accent: 'neutral',
  },
  {
    name: 'Finanzas',
    slug: 'finanzas',
    description: 'Dinero, decisiones y conceptos económicos accesibles.',
    accent: 'yellow',
  },
  {
    name: 'Cultura',
    slug: 'cultura',
    description: 'Identidad, tradiciones y formas de ver el mundo.',
    accent: 'red',
  },
  {
    name: 'Otros',
    slug: 'otros',
    description: 'Todo lo que no cabe en una sola etiqueta.',
    accent: 'neutral',
  },
];

export function slugifyCategory(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function getCategoryByName(name: string): CategoryMeta {
  const slug = slugifyCategory(name);
  return (
    CATEGORIES.find((c) => c.slug === slug || c.name.toLowerCase() === name.toLowerCase()) ?? {
      name,
      slug,
      description: `Artículos sobre ${name}.`,
      accent: 'neutral',
    }
  );
}

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
