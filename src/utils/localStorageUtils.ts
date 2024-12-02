export const saveUuid = (uuid: string, ttl: number) => {
    const expires = Date.now() + ttl; // Calculate expiration time
    const data = { uuid, expires };
    localStorage.setItem('session_uuid', JSON.stringify(data));
};
  
export const getUuid = (): string | null => {
    const storedData = localStorage.getItem('session_uuid');
    if (!storedData) return null;
  
    const { uuid, expires } = JSON.parse(storedData);
    if (Date.now() > expires) {
      localStorage.removeItem('session_uuid'); // Remove expired UUID
      return null;
    }
    return uuid;
};
  