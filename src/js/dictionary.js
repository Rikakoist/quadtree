let dic = {
  annonation: "标记",
  fullLabel: "全局索引",
  label: "本地索引",
  indexes: "要素索引",
  geomType: "几何类型",
  Point: "点",
  LineString: "线",
  Polygon: "多边形",
  Circle: "圆",
};
export default function dicTranslate(str) {
  return dic[str] ?? str;
}
