export interface MenuData {
    name: string;
      value: Array<SecondMenu>
  }
  
  export interface SecondMenu {
      name: string;
      value: Array<ThirdMenu>
  }
  
  export interface ThirdMenu {
      name: string;
      icon?: string;
      id: number;
  }