export type OcrData = Record<string, string | null>;

export interface ApiResponse<T> {
  status: number;
  data: T;
}

export type OcrResponse = ApiResponse<OcrData>;