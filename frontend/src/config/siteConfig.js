/**
 * Central site configuration for Campo.
 * Update contact placeholders, social URLs, and brand metadata here.
 */
export const siteConfig = {
  brand: {
    name: 'Campo',
    tagline: 'One Institution. One Connected Ecosystem.',
    description:
      'An integrated institutional management platform uniting admissions, academics, finance, administration, campus operations, and permission-scoped intelligence.',
  },
  contact: {
    email: 'contact@campo-institution.example',
    phone: '+[Country] [Institution Contact Number]',
    address: '[Campus / Corporate Office Address Placeholder]',
    website: 'https://campo-institution.example',
    note: 'Contact details above are configurable placeholders in src/config/siteConfig.js.',
  },
  social: [
    { id: 'linkedin', label: 'LinkedIn', href: '#contact' },
    { id: 'x', label: 'X (Twitter)', href: '#contact' },
    { id: 'globe', label: 'Institutional Portal', href: '#platform' },
  ],
  legal: {
    copyrightHolder: 'Campo Institutional Platform',
  },
};

