export interface Indicator {
  code: string;
  name: string;
  short_name: string;
  description?: string;
  calculation: string;
  category: string;
};

export interface IndicatorCategory {
  code: string;
  name: string;
}
