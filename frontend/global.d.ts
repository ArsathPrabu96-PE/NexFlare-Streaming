// CSS Module declarations for TypeScript
declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.css?inline' {
  const content: string;
  export default content;
}

// Global CSS imports
declare module './globals.css';
declare module './mobile-optimizations.css';
declare module './spacing.css';

// Image file declarations
declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}