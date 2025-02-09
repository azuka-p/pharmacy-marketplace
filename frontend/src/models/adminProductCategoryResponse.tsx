export type adminProductCategoryResponse = {
  id: number;
  name: string;
};

export type adminProductCategoryCreateRequest = {
  name: string;
};

export type adminProductCategoryCreateResponse = {
  id: number;
  name: string;
};

export interface adminCategoryPatch {
  id: number;
  name: string;
}
