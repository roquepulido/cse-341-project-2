import swaggerAutogen from "swagger-autogen";
import { version } from "./server.js";
const doc = {
  info: {
    title: "Project 02 Journal API",
    version: version,
    description: "API documentation"
  },
  host: "localhost:3000",
  schemes: ["http"],
  definitions: {
    Journal: {
      title: "Sample Journal",
      content: "This is a sample journal entry.",
      author: "60d21b4667d0d8992e610c85",
      isPublic: true,
      allowedViewers: ["60d21b4667d0d8992e610c84", "60d21b4667d0d8992e610c86"],
      tags: ["tag1", "tag2"],
      mood: "happy",
      location: "New York"
    },
    Comment: {
      journalId: "60d21b4667d0d8992e610c85",
      text: "This is a sample comment.",
      commenter: "60d21b4667d0d8992e610c84"
    },
    User: {
      oauthId: "60d21b4667d0d8992e610c85",
      email: "user@example.com",
      name: "Sample User",
      profilePicture: "https://example.com/profile.jpg"
    },
    Error: {
      message: "Error message"
    }
  }
};
const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];
swaggerAutogen(outputFile, endpointsFiles, doc);
