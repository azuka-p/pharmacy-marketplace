export interface adminPartnerResponse {
  id: number;
  name: string;
  year_founded: number;
  active_days: string;
  operational_hour_start: string;
  operational_hour_end: string;
  is_active: boolean;
}
export interface adminPartnerPost {
  name: string;
  year_founded: number;
  active_days: string;
  operational_hour_start: string;
  operational_hour_end: string;
  isActive: boolean;
}
