export const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const loadFromLocalStorage = (key) => {
  const savedData = localStorage.getItem(key);
  return savedData ? JSON.parse(savedData) : [];
};
