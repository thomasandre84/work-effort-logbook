export interface WorkTime {
  id: string,
  workId: string,
  startTime: Date,
  endTime: Date,
  workingMinutes: number | undefined
}

export interface CreateWorkTime {
  workId: string,
  startTime: Date,
  endTime: Date
}
