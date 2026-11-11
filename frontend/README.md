# Campo — Frontend Website

Modern institutional SaaS website for **Campo**, built with React, Vite, Tailwind CSS, Framer Motion, and Lucide React.

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Configuration

- **Contact & Brand Placeholders**: Edit `src/config/siteConfig.js` to configure official email, phone, office address, website, and social links.
- **Sections & Applications Content**: Edit `src/data/campoData.js` to update applications, AI capability descriptions, or institutional workflows.
- **Contact Form Backend Integration**: Copy `.env.example` to `.env` and set `VITE_CONTACT_API_URL` to connect `src/services/contactService.js` to a live backend endpoint. Without `VITE_CONTACT_API_URL`, the form operates transparently in Frontend Preview Mode.

