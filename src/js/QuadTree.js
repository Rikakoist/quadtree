import Polygon from "ol/geom/Polygon";
import Feature from "ol/Feature";

class QuadTree {
  parent; //父节点
  level; //树深度
  label;

  width; //边长
  bottomLeft; //左下角坐标
  bottomRight; //右下角坐标
  topRight; //右上角坐标
  topLeft; //左上角坐标

  layer; //本节点要素所在图层
  polygon; //本节点对应的正方形
  feature; //本节点对应的正方形要素
  child = undefined; //子节点
  constructor(parent = undefined, level = 0, label = "0", bottomLeft, width) {
    this.parent = parent;
    this.level = level;
    this.label = label;

    this.width = width;

    //计算四至点坐标
    this.bottomLeft = bottomLeft;
    this.bottomRight = [this.bottomLeft[0], this.bottomLeft[1] + this.width];
    this.topLeft = [this.bottomLeft[0] + this.width, this.bottomLeft[1]];
    this.topRight = [
      this.bottomLeft[0] + this.width,
      this.bottomLeft[1] + this.width,
    ];

    this.layer = window.quadTreeLayers[this.level];
    //console.log(this.layer);
    this.initGeom();
    //只对叶子节点计算索引？
    this.level == window.quadTreeMaxLevel - 1 && this.getIntersectFeature();
    this.createChild();
  }
  //初始化节点
  initGeom() {
    //新建几何体、要素并添加到图层
    this.polygon = new Polygon([
      [
        this.bottomLeft,
        this.bottomRight,
        this.topRight,
        this.topLeft,
        this.bottomLeft,
      ],
    ]);
    this.feature = new Feature(this.polygon);
    this.feature.set("treeNode", this);
    this.feature.set("label", this.label);
    this.feature.set("fullLabel", this.getFullLabel());
    this.feature.set("annonation", "索引格网");

    this.layer.getSource().addFeature(this.feature);
  }
  getIntersectFeature() {
    window.drawLayer
      .getSource()
      .getFeatures()
      .forEach((fea) => {
        if (fea.getGeometry().intersectsExtent(this.polygon.getExtent())) {
          let tmp = fea.get("indexes");
          if (!tmp) {
            tmp = [];
          }
          tmp.push(this.getFullLabel());
          fea.set("indexes", tmp);
        }
      });
  }
  //创建子节点
  createChild() {
    if (this.level < window.quadTreeMaxLevel - 1) {
      //新建四个子要素
      let child0 = new QuadTree(
        this,
        this.level + 1,
        "0",
        [this.bottomLeft[0], this.bottomLeft[1] + this.width / 2],
        this.width / 2
      );
      let child1 = new QuadTree(
        this,
        this.level + 1,
        "1",
        [
          this.bottomLeft[0] + this.width / 2,
          this.bottomLeft[1] + this.width / 2,
        ],
        this.width / 2
      );
      let child2 = new QuadTree(
        this,
        this.level + 1,
        "2",
        this.bottomLeft,
        this.width / 2
      );
      let child3 = new QuadTree(
        this,
        this.level + 1,
        "3",
        [this.bottomLeft[0] + this.width / 2, this.bottomLeft[1]],
        this.width / 2
      );
      this.child = [child0, child1, child2, child3];
    }
  }
  //递归获取本节点完整索引编号
  getFullLabel() {
    if (this.parent) {
      return this.parent.getFullLabel() + this.label;
    } else {
      return this.label;
    }
  }
}

export default QuadTree;
