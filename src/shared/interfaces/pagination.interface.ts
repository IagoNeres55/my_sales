export interface IPagination<DataType> {
  data: DataType[]
  pagination: {
    per_page: number
    total: number
    current_page: number
    total_pages: number
    next_page: number | null
    prev_page: number | null
  }
}
