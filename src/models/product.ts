export interface Product {
  id?: number;
  status?: string;
  currency?: string;
  total?: number;
  createdAt?: Date;
  client?: string;
  invoice?: string;
  order?: string;
  fundingMethod?: string;
  updatedAt?: Date;
  createdBy?: number;
}

export interface SearchDataType {
  status: string;
  from?: string;
  to?: string;
  client: string;
  invoice: string;
}

export interface UpdateProduct {
  id?: number;
  status?: string;
  currency?: string;
  total?: number;
  client?: string;
  invoice?: string;
  order?: string;
  fundingMethod?: string;
}
