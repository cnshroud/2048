import { _decorator, AudioSource, Color, Component, instantiate, Label, Node, Prefab, Sprite, SpriteFrame, TiledLayer } from 'cc';
import { Tile } from './Tile';
const { ccclass, property } = _decorator;

@ccclass('Controller')
export class Controller extends Component {

    //分数文本
    @property(Label)
    label: Label = null;
    //最高分文本
    @property(Label)
    maxlabel: Label = null;
    ///滑动节点，只有在这个节点范围内的滑动才有效
    @property(Node)
    touchNode: Node = null;
    //瓦片父类
    @property(Node)
    gaid: Node = null;
    //瓦片预制体
    @property(Prefab)
    tilePrefab: Prefab = null;

    //全局音效
    @property(AudioSource)
    audio: AudioSource = null;

    //瓦片值,类型为number的二维数组，用来存储所有的瓦片的位置
    private tileValue: number[][] = [];

    //类型为node的二维数组，用来存储所有的瓦片信息
    private tiles: Node[][] = [];

    start() {
        this.initData()
        this.setbgTile()
    }

    initData() {
        //初始化数据
        this.label.string = "0";
        for (let i = 0; i < 4; i++) {
            //先给二维数组赋值为空,不然之后调用值为undefined
            this.tileValue[i] = [];
            this.tiles[i] = [];
            for (let j = 0; j < 4; j++) {
                this.tileValue[i][j] = 0;
                this.tiles[i][j] = null;

            }

        }

    }


    //设置背景格子,因为背景格子是空格子，所以value参数是0
    setbgTile() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                //拿着i和j去创建瓦片
                this.createTile(0, i, j);
            }

        }
    }
    //创建瓦片
    createTile(value: number, x: number, y: number) {
        //创建瓦片
        let tile = instantiate(this.tilePrefab);
        let tileScript = tile.getComponent(Tile)
        console.log(value, x, y);
        tileScript.inittile(value, x, y);
        this.gaid.addChild(tile);
        //把瓦片添加到数组中
        this.tiles[x][y] = tile;
        //把瓦片的值添加到数组中
        this.tileValue[x][y] = value;
        // for (let i = 0; i < this.tiles.length; i++) {
        //     for (let j = 0; j < this.tiles[i].length; j++) {
        //         console.log("打印出所有的瓦片", this.tiles[i][j]);//打印出所有的瓦片
        //     }

        // }
    }

}


