// storage.ts

export const saveGameState = (
    key: string,
    data: Record<string, any>
  ): void => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  
  export const loadGameState = (key: string): Record<string, any> | null => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };
  
  export const clearGameState = (key: string): void => {
    localStorage.removeItem(key);
  };
  