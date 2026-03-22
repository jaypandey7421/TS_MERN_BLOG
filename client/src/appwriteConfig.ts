import { Client, Storage, ID } from "appwrite";

const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Appwrite Endpoint
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Appwrite Project ID

export const storage = new Storage(client);
export { ID }; // Export ID to generate unique IDs
