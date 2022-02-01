export enum AuthView {
  Login,
  Register,
}

export interface TAuthViewContentProps {
  swapView: (view: AuthView) => void;
}
