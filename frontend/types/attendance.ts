export type Status = "present" | "absent";

export interface Learner {
  id: string;
  name: string;
  status: Status;
}