const N = 10;
const gData = [...Array(N).keys()].map(() => ({
  lat: (37.2023 - 0.5) * 180,
  lng: (37.0635 - 0.5) * 360,
  maxR: Math.random() * 20 + 3,
  propagationSpeed: (Math.random() - 0.5) * 20 + 1,
  repeatPeriod: Math.random() * 2000 + 200
}));

const colorInterpolator = t => 'rgba(255,100,50,${Math.sqrt(1-t)})';

const globe = Globe()
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
  .ringsData(gData)
  .ringColor(() => colorInterpolator)
  .ringMaxRadius('maxR')
  .ringPropagationSpeed('propagationSpeed')
  .ringRepeatPeriod('repeatPeriod')
  (document.getElementById('globeViz'));