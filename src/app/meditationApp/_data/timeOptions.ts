export interface TimeOption {
  id: string;
  label: string;
  duration: number; // 秒
}

export const timeOptions: TimeOption[] = [
  { id: '2min', label: '2 Minutes', duration: 120 },
  { id: '5min', label: '5 Minutes', duration: 300 },
  { id: '10min', label: '10 Minutes', duration: 600 },
  { id: '15min', label: '15 Minutes', duration: 900 },
];