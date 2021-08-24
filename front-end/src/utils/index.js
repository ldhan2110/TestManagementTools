//GENERATE A RANDOM NUMBER BETWEEN HIGH AND LOW
export const rand = (high=500,low=0) => {
  return Math.floor(Math.random() * (high - low + 1)) + low;
}

//RETURN A RANDOM COLOR VALUE
export const generateColor = () => {
  return `rgb(${rand(255,0)},${rand(255,0)},${rand(255,0)})`;
}