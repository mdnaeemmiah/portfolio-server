export interface Project {
  title: string // The title of the project
  description: string // A brief description of the project
  image: string // URL of the project's image or screenshot
  liveLink: string // A link to the live or deployed project
  order?: number // Display order for sorting (defaults to 0)
  frontendSource?: string // Frontend repository URL
  backendSource?: string // Backend repository URL
}
