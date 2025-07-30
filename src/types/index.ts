
export type PostType = {
  userDetails: UserType;
  createdAt: string;
  body: string;
  emoji?: string;
};

export type UserType = {
  username: string;
  email?: string;
  userImg?: string
};
