import {
  createProjectMutation,
  createUserMutation,
  getProjectByIdQuery,
  getUserQuery,
  projectsQuery,
} from "@/graphql";

import { GraphQLClient } from "graphql-request";
import { ProjectForm } from "@/common.types";

const isProduction = process.env.NODE_ENV === "production";

const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL!
  : "http://127.0.0.1:4000/graphql";
const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY!
  : "letmein";
const serverUrl = isProduction
  ? "http://localhost:3000"
  : "http://localhost:3000";
const client = new GraphQLClient(apiUrl);

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (error) {
    throw error;
  }
};
export const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({ path: imagePath }),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};
const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (error) {
    console.log(error);
  }
};
export const fetchAllProjects = async (
  category?: string | null,
  endCursor?: string | null
) => {
  client.setHeader("x-api-key", apiKey);

  return makeGraphQLRequest(projectsQuery, { category, endCursor });
};

export const createNewProject = async (
  form: ProjectForm,
  creatorId: string,
  token: string
) => {
  const imageUrl = await uploadImage(form.image);

  if (imageUrl.url) {
    client.setHeader("Authorization", `Bearer ${token}`);

    const variables = {
      input: {
        ...form,
        image: imageUrl.url,
        createdBy: {
          link: creatorId,
        },
      },
    };

    return makeGraphQLRequest(createProjectMutation, variables);
  }
};
export const getUser = (email: string) => {
  client.setHeader("x-api-key", apiKey);
  console.log(email);
  debugger;
  return makeGraphQLRequest(getUserQuery, { email });
};
export const createUser = (name: string, email: string, avatarUrl: string) => {
  client.setHeader("x-api-key", apiKey);
  const variables = {
    input: {
      name,
      email,
      avatarUrl,
    },
  };
  return makeGraphQLRequest(createUserMutation, variables);
};
export const getProjectDetails = (id:string) =>{
  client.setHeader('x-api-key',apiKey);
  return makeGraphQLRequest(getProjectByIdQuery,{id})
}
