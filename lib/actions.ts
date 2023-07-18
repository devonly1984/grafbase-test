import {
  createProjectMutation,
  createUserMutation,
  deleteProjectMutation,
  getProjectByIdQuery,
  getProjectsOfUserQuery,
  getUserQuery,
  projectsQuery,
  updateProjectMutation,
} from "@/graphql";

import { GraphQLClient } from "graphql-request";
import { ProjectForm } from "@/common.types";

const isProduction = true

const apiUrl =  process.env.NEXT_PUBLIC_GRAFBASE_API_URL!
  
const apiKey =  process.env.NEXT_PUBLIC_GRAFBASE_API_KEY!
  
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
export const fetchAllProjects =  async (
  category?: string | null,
  endcursor?: string | null 
) => {
  client.setHeader("x-api-key", apiKey);

  return makeGraphQLRequest(projectsQuery, { category, endcursor });
};

export const createNewProject = async (
  form: ProjectForm,
  creatorId: string,
  token: string
) => {
  const imageUrl = await uploadImage(form.image);

  if (imageUrl.url) {
  
    
    client.setHeader("authorization", `Bearer ${token}`);
  

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
export const getUserProjects = (id:string,last?:number) =>{
  client.setHeader('x-api-key',apiKey);
  return makeGraphQLRequest(getProjectsOfUserQuery,{id,last})
}
export const deleteProjects = (id:string,token:string) =>{
  client.setHeader("Authorization",`Bearer ${token}`);
  return makeGraphQLRequest(deleteProjectMutation,{id})
}
export const updateProjects = async (form: ProjectForm,projectId:string,token:Object) =>{
  const isBase64DataURL = (value:string) => {
    const base64Rexex = /^data:image\/[a-z]+;base64,/;
    return base64Rexex.test(value);
  }
  
  let updatedForm = {...form}
  const isUploadingnewImage  = isBase64DataURL(form.image);
  
  if (isUploadingnewImage) {
    const imageUrl  = await uploadImage(form.image)
    if (imageUrl.url) {
      updatedForm={
        ...form,image: imageUrl.url
      }
    }
  }

  const variables = {
    id: projectId,
    input: updatedForm
  }
  
  client.setHeader("Authorization",`Bearer ${token}`);
  return makeGraphQLRequest(updateProjectMutation,{variables})
}