import { Modal } from "@/components";
import { ProjectInterface } from "@/common.types";
import { getCurrentUser } from "@/lib/session";
import { getProjectDetails } from "@/lib/actions";
type Props = {};

const ProjectDetails = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const session = await getCurrentUser();
  const result = (await getProjectDetails(id)) as {
    project?: ProjectInterface;
  };
  if (!result?.project) {
    <p>Failed to fetch project information</p>
  }
  return <Modal></Modal>
};

export default ProjectDetails;
