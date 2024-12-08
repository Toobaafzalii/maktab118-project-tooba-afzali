export interface UsersDto {
  status: string;
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: {
    users: Array<UserDto>;
  };
}

export interface UserDto {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  phoneNumber: string;
  address: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserByIdDto {
  status: string;
  data: {
    user: {
      _id: string;
      firstname: string;
      lastname: string;
      username: string;
      phoneNumber: string;
      address: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
  };
}
