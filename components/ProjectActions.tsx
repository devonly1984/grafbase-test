"use client"
import { deleteProjects, fetchToken } from "@/lib/actions"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"



const ProjectActions = ({projectId}: {projectId: string}) => {
    const [isDeleting,setIsDeleting] = useState(false)
    const router = useRouter();
    const handleDeleteProject = async() => {
        setIsDeleting(true);
        const {token} = await fetchToken();
        try {
            await deleteProjects(projectId,token);
            router.push('/');

        } catch (error) {
            throw error;
        } finally {
            setIsDeleting(false);
        }
    }
  return (
    <>
    <Link href={`/edit-project/${projectId}`} className="flexCenter edit-action_btn">
        <Image src="/pencile.svg" width={15} height={15} alt="edit"/>
    </Link>
    <button type="button" onClick={handleDeleteProject}className={`flexCenter delete-action_btn ${isDeleting ? "bg-gray" : "bg-primary-purple"}`}>
    <Image src="/trash.svg" width={15} height={15} alt="trash"/>
    </button>
    </>
  )
}

export default ProjectActions