export interface UserDto {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
}

export interface GetUsersParams {
  page: number;
  q: string;
}
