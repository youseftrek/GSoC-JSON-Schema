export const navLinks = [
  {
    name: "Specification",
    path: "/specification",
  },
  {
    name: "Docs",
    path: "/docs",
  },
  {
    name: "Tools",
    path: "/tools",
  },
  {
    name: "Blog",
    path: "/blog",
  },
  {
    name: "Community",
    path: "/community",
  },
];

export const steps = {
  totalSteps: 2,
  tasks: [
    {
      id: 1,
      title: "Step 1",
      description: "Define and Validate a JSON Schema(Draft 2020-12).",
      schema: {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        type: "object",
        properties: {
          // Define properties specific to Step 1 schema if needed
        },
        required: ["$schema", "type"],
      },
    },
    {
      id: 2,
      title: "Step 2",
      description: "Define an Array Schema with Number Items.",
      schema: {
        $schema: "https://json-schema.org/draft/2020-12/schema",
        type: "array",
        items: {
          type: "number",
        },
      },
    },
  ],
};
