export type TaskStatus= 'pending'|'in-progress'|'completed'

export interface Task {
    id:number;
    title:string;
    description:string;
    status:TaskStatus;
    priority:'low'|'medium'|'high'
    dueDate: string
}



export interface TaskListProps{
    tasks:Task[];
    onStatusChange:(taskId:string,newStatus:TaskStatus)=>void
    onDelete:(taskId:string)=>void
}

export interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}
export interface TaskFilterProps {
  onFilterChange: (filters: {
    status?: TaskStatus;
    priority?: 'low' | 'medium' | 'high';
  }) => void;
}

export interface EditProps {
  edit: Task
  onSubmit: (updated:Task) => void;
}

export interface SearchProps {
  tasks: Task[];
  onSearch: (results: Task[]) => void;
}

