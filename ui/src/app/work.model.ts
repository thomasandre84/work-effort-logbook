export interface Work {
  id: string,
  name: string,
  status: string
}

export interface UpdateWork {
  name: string;
  status: string
}

export interface CreateWork {
  name: string;
}
