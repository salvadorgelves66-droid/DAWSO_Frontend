const activeTimers = new Set();

function useEffect(effect) {
  return effect();
}

function startInterval(callback, delay) {
  const id = setInterval(callback, delay);
  activeTimers.add(id);
  return id;
}

function stopInterval(id) {
  clearInterval(id);
  activeTimers.delete(id);
}

const cleanup = useEffect(() => {
  const id = startInterval(() => {}, 1000);
  return () => stopInterval(id);
});

console.log(`Timers activos antes del cleanup: ${activeTimers.size}`);
cleanup();
console.log(`Timers activos después del cleanup: ${activeTimers.size}`);

if (activeTimers.size !== 0) {
  throw new Error("El cleanup no detuvo el intervalo.");
}
