import { ProjectInterface } from "@/common.types"
import { fetchAllProjects } from "@/lib/actions"

type ProjectsSearch = {
  projectSearch: {
    edges: {
      node: ProjectInterface[];
      pageInfo: {
        hasPreviousPage: boolean;
        hasNextPage: boolean;
        startCursor: string;
        endCursor: string;
      }
    }
  }
}

const Home = async () => {
  const data = await fetchAllProjects() as ProjectsSearch;
  const projectsToDisplay = data?.projectSearch?.edges || [];
  
  return (
    <section className="flex-start flex-col mb-16 paddings">
        Categories
        Posts
        LoadMore
    </section>
  )
}

export default Home