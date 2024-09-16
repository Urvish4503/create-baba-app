export const dependnacies = {
  // TailwindCSS

  tailwind: {
    tailwindcss: "^3.4.3",
    postcss: "^8.4.39",
    "prettier-plugin-tailwindcss": "^0.6.5",
    prettier: "^3.3.2",
  },

  // Prisma
  prisma: {
    prisma: "^5.14.0",
    "@prisma/client": "^5.14.0",
    "@prisma/adapter-planetscale": "^5.14.0",
  },

  // Drizzle
  drizzle: {
    "drizzle-kit": "^0.24.0",
    "drizzle-orm": "^0.33.0",
    "eslint-plugin-drizzle": "^0.2.3",
    mysql: {
      mysql2: "^3.11.0",
    },
    postgresql: {
      postgres: "^3.4.4",
    },
    "@libsql/client": "^0.9.0",
  },
};
