export interface WorkTime {
  id: string,
  workId: string,
  startTime: Date,
  endTime: Date,
}

export interface CreateWorkTime {
  workId: string,
  startTime: Date,
}
