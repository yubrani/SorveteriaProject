

export type UserInfo = {
    id: string;
    email: string;
    name: string;
    password: string;
    role: string;


}
export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export type State ={
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
        role?: string[];
      
    };
    message?: string | null;
};
export type StateUpdate = {
     errors?: {
    name?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string | null;
};


export type CurrentUser = {
  id: string;
  name: string;
  role: string;
  email: string;
};

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url?: string;
    categoryId: number;
};
export type Category = {
    id: number;
    name: string;
    image_url: string;
    
};

