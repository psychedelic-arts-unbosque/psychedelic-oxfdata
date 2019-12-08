import { PropsWithChildren, CSSProperties } from 'react';

type BaseReactProps<P = {}> = PropsWithChildren<P> & {
    styles?: CSSProperties;
    className?: string;
    key?: symbol | string | number;
  };
  
  // Adding typedef for react
  // Creating a new type for react
  // so, when you import the react library, you can access to this type
  // These types don't belong to React API originally
  declare module 'react' {
    // Gerenics:
    // @Attr T can be another properties
    export type BaseProps = BaseReactProps;
  }
  