import { Modal, ProjectForm } from "@/components"


type Props = {}

const CreateProject = (props: Props) => {
  return (
    <Modal>
        <h3 className="modal-head-text">Create a New Project</h3>
        <ProjectForm />
    </Modal>
  )
}

export default CreateProject