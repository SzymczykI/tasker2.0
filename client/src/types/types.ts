export interface IList {
    authorId: string;
    id: string;
    title: string;
  } 

export interface ITask {
  title: string;
  description: string;
  type: string;
  label: string;
}

export interface ITasks {
  id: string
  title: string;
  description: string;
  type: string;
  label: string;
}